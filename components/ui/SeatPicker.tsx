"use client";

import { useMemo, useState } from "react";

// ---- Types matching your backend response ----

export type SeatStatus = "available" | "booked" | "reserved" | string;

export interface BackendSeat {
  id: string;
  seatNumber: string;
  seatType: string; // e.g. "regular", "vip"
  rowNumber: number;
  columnNumber: number;
  price: string; // numeric string from backend, e.g. "12.00"
  status: SeatStatus;
}

interface RowMarker {
  afterRow: number;
  type: "front-door" | "back-door";
}

// Statuses that should render as unavailable/non-clickable.
const UNAVAILABLE_STATUSES = new Set(["booked", "reserved", "unavailable"]);

// ---- Component ----

interface SeatPickerProps {
  /** Raw seat list from the backend */
  seats: BackendSeat[];
  /** How many of the columns (from the left) belong to the left block. Rest go right. */
  leftCount?: number;
  /**
   * Extra seat ids to treat as booked on top of whatever `status` says —
   * useful for seats another user is actively holding in a live session.
   */
  bookedSeatIds?: string[];
  /** Max number of seats a user can select at once */
  maxSelectable?: number;
  /** Show a non-clickable driver/attendant row above the seat grid */
  includeDriverRow?: boolean;
  /** Insert a "Front door" label after this rowNumber */
  frontDoorAfterRow?: number;
  /** Insert a "Back door" label after this rowNumber */
  backDoorAfterRow?: number;
  /** Fallback price if a seat's own `price` is missing or unparsable */
  defaultPrice?: number;

  /**
   * Controlled selection. If provided, the component will not track its own
   * selection state — the parent owns it and must update it via onSeatsChange.
   */
  selectedSeatIds?: string[];
  /**
   * Fired every time a seat is clicked (selected or deselected), with the
   * full updated list of selected seats (ids + full seat objects).
   */
  onSeatsChange?: (selectedIds: string[], selectedSeats: BackendSeat[]) => void;
}

function parsePrice(price: string, fallback: number): number {
  const n = parseFloat(price);
  return Number.isFinite(n) ? n : fallback;
}

export default function SeatPicker({
  seats,
  leftCount = 2,
  bookedSeatIds = [],
  maxSelectable = 4,
  includeDriverRow = true,
  frontDoorAfterRow,
  backDoorAfterRow,
  defaultPrice = 12,
  selectedSeatIds,
  onSeatsChange,
}: SeatPickerProps) {
  const isControlled = selectedSeatIds !== undefined;

  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const selected = isControlled ? selectedSeatIds! : internalSelected;

  // A seat is unavailable if its backend status says so, OR it's in the
  // externally-passed bookedSeatIds (e.g. someone else holding it live).
  function isSeatUnavailable(seat: BackendSeat) {
    return (
      UNAVAILABLE_STATUSES.has(seat.status) ||
      bookedSeatIds.includes(seat.seatNumber)
    );
  }

  // Derive rows, column split, and row markers directly from the seat data.
  const { rows, rowsMap, perRow, rowMarkers } = useMemo(() => {
    const rowNumbers = Array.from(new Set(seats.map((s) => s.rowNumber))).sort(
      (a, b) => a - b,
    );
    const maxColumn = seats.reduce(
      (max, s) => Math.max(max, s.columnNumber),
      0,
    );

    const rowsMap = new Map<number, BackendSeat[]>();
    for (const row of rowNumbers) {
      rowsMap.set(
        row,
        seats
          .filter((s) => s.rowNumber === row)
          .sort((a, b) => a.columnNumber - b.columnNumber),
      );
    }

    const rowMarkers: RowMarker[] = [];
    if (frontDoorAfterRow !== undefined) {
      rowMarkers.push({ afterRow: frontDoorAfterRow, type: "front-door" });
    }
    if (backDoorAfterRow !== undefined) {
      rowMarkers.push({ afterRow: backDoorAfterRow, type: "back-door" });
    }

    return { rows: rowNumbers, rowsMap, perRow: maxColumn, rowMarkers };
  }, [seats, frontDoorAfterRow, backDoorAfterRow]);

  const rightCount = Math.max(perRow - leftCount, 0);

  function toggleSeat(seat: BackendSeat) {
    if (isSeatUnavailable(seat)) return;

    let next: string[];
    if (selected.includes(seat.seatNumber)) {
      next = selected.filter((id) => id !== seat.seatNumber);
    } else {
      if (selected.length >= maxSelectable) return;
      next = [...selected, seat.seatNumber];
    }

    if (!isControlled) setInternalSelected(next);

    const nextSeats = seats.filter((s) => next.includes(s.seatNumber));
    onSeatsChange?.(next, nextSeats);
  }

  const total = useMemo(() => {
    return seats
      .filter((s) => selected.includes(s.seatNumber))
      .reduce((sum, s) => sum + parsePrice(s.price, defaultPrice), 0);
  }, [seats, selected, defaultPrice]);

  return (
    <div className="mx-auto w-full">
      {/* <div className="mb-4 flex flex-wrap gap-4 text-sm text-neutral-600">
        <Legend swatchClass="border border-neutral-300 bg-white" label="Available" />
        <Legend swatchClass="bg-blue-600" label="Selected" />
        <Legend swatchClass="bg-neutral-300" label="Booked" />
      </div> */}

      <div className="rounded-xl">
        <div className="flex flex-col gap-1.5">
          {includeDriverRow && (
            <div
              className="grid items-center justify-center gap-1.5"
              style={{
                gridTemplateColumns: `repeat(${leftCount}, 40px) 20% repeat(${rightCount}, 40px)`,
              }}
            >
              <div className="flex h-[40px] w-full items-center justify-center rounded-md border border-neutral-300 bg-neutral-100 text-[9px] font-medium text-neutral-500">
                Driver
              </div>
              {Array.from({ length: Math.max(leftCount - 1, 0) }).map(
                (_, i) => (
                  <span key={`left-fill-${i}`} />
                ),
              )}
              <span />
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-md border border-neutral-300 bg-neutral-100 text-[9px] font-medium text-neutral-500">
                Attendant
              </div>
              {Array.from({ length: Math.max(rightCount - 1, 0) }).map(
                (_, i) => (
                  <span key={`right-fill-${i}`} />
                ),
              )}
            </div>
          )}

          {rows.map((row) => {
            const rowSeats = rowsMap.get(row) ?? [];
            const leftSeats = rowSeats.filter(
              (s) => s.columnNumber <= leftCount,
            );
            const rightSeats = rowSeats.filter(
              (s) => s.columnNumber > leftCount,
            );
            const marker = rowMarkers.find((m) => m.afterRow === row);

            return (
              <div key={row}>
                <div
                  className="grid items-center justify-center gap-1.5"
                  style={{
                    gridTemplateColumns: `repeat(${leftSeats.length}, 40px) 20% repeat(${rightSeats.length}, 40px)`,
                  }}
                >
                  {leftSeats.map((seat) => (
                    <SeatButton
                      key={seat.id}
                      seat={seat}
                      isBooked={isSeatUnavailable(seat)}
                      isSelected={selected.includes(seat.seatNumber)}
                      onClick={() => toggleSeat(seat)}
                    />
                  ))}
                  <span />
                  {rightSeats.map((seat) => (
                    <SeatButton
                      key={seat.id}
                      seat={seat}
                      isBooked={isSeatUnavailable(seat)}
                      isSelected={selected.includes(seat.seatNumber)}
                      onClick={() => toggleSeat(seat)}
                    />
                  ))}
                </div>

                {marker && (
                  <div className="mt-1.5 flex items-center justify-end gap-1.5 pl-1 text-xs text-neutral-500">
                    {marker.type === "back-door" ? "Back door" : "Front door"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">
        <span className="text-sm text-neutral-600">
          {selected.length === 0
            ? "No seats selected"
            : `${selected.length} seat${selected.length > 1 ? "s" : ""}`}
        </span>
        <span className="text-lg font-medium">${total.toFixed(2)}</span>
      </div> */}
    </div>
  );
}

function SeatButton({
  seat,
  isBooked,
  isSelected,
  onClick,
}: {
  seat: BackendSeat;
  isBooked: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={isBooked}
      onClick={onClick}
      aria-label={`Seat ${seat.seatNumber}${isBooked ? ", booked" : isSelected ? ", selected" : ""}`}
      className={[
        "h-[40px] w-[40px] rounded-md text-[10px] font-medium transition",
        isBooked
          ? "cursor-not-allowed border border-neutral-300 bg-neutral-300 text-neutral-500"
          : isSelected
            ? "bg-primary text-white"
            : "border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400",
      ].join(" ")}
    >
      {seat.seatNumber}
    </button>
  );
}

function Legend({
  swatchClass,
  label,
}: {
  swatchClass: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-3.5 w-3.5 rounded ${swatchClass}`} />
      {label}
    </div>
  );
}
