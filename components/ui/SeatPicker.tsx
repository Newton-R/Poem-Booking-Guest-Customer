"use client";

import { useMemo, useState } from "react";

// ---- Layout logic (same as lib/seatLayout.ts) ----

interface SeatLayoutConfig {
  totalRows: number;
  leftCount: number;
  rightCount: number;
  backDoorAfterSeat?: number;
  frontDoorAfterSeat?: number;
  price: number;
}

interface Seat {
  number: number;
  row: number;
  side: "left" | "right";
}

interface RowMarker {
  afterRow: number;
  type: "front-door" | "back-door";
}

function generateLayout(config: SeatLayoutConfig) {
  const {
    totalRows,
    leftCount,
    rightCount,
    backDoorAfterSeat,
    frontDoorAfterSeat,
  } = config;
  const perRow = leftCount + rightCount;

  const rowMarkers: RowMarker[] = [];
  if (frontDoorAfterSeat !== undefined) {
    rowMarkers.push({
      afterRow: frontDoorAfterSeat / perRow,
      type: "front-door",
    });
  }
  if (backDoorAfterSeat !== undefined) {
    rowMarkers.push({
      afterRow: backDoorAfterSeat / perRow,
      type: "back-door",
    });
  }

  const seats: Seat[] = [];
  let seatNumber = 1;
  for (let row = 1; row <= totalRows; row++) {
    for (let i = 0; i < leftCount; i++)
      seats.push({ number: seatNumber++, row, side: "left" });
    for (let i = 0; i < rightCount; i++)
      seats.push({ number: seatNumber++, row, side: "right" });
  }

  return { seats, rowMarkers, perRow };
}

// ---- Default 70-seat, 2+3 layout, back door after seat 60 ----

const DEFAULT_LAYOUT: SeatLayoutConfig = {
  totalRows: 14,
  leftCount: 2,
  rightCount: 3,
  backDoorAfterSeat: 60,
  price: 12,
};

// Swap this for real data fetched from your API once the backend exists.
const MOCK_BOOKED_SEATS = [3, 7, 12, 20, 34, 41, 55, 62];

// ---- Component ----

interface SeatPickerProps {
  layout?: SeatLayoutConfig;
  bookedSeats?: number[];
  maxSelectable?: number;
  onConfirm?: (selectedSeats: number[]) => void;
}

export default function SeatPicker({
  layout = DEFAULT_LAYOUT,
  bookedSeats = MOCK_BOOKED_SEATS,
  maxSelectable = 4,
  onConfirm,
}: SeatPickerProps) {
  const { seats, rowMarkers, perRow } = useMemo(
    () => generateLayout(layout),
    [layout],
  );
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggleSeat(number: number) {
    if (bookedSeats.includes(number)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(number)) {
        next.delete(number);
      } else if (next.size < maxSelectable) {
        next.add(number);
      }
      return next;
    });
  }

  const rows = Array.from({ length: layout.totalRows }, (_, i) => i + 1);
  const total = selected.size * layout.price;

  return (
    <div className="mx-auto w-full">
      {/* <div className="mb-4 flex flex-wrap gap-4 text-sm text-neutral-600">
        <Legend swatchClass="border border-neutral-300 bg-white" label="Available" />
        <Legend swatchClass="bg-blue-600" label="Selected" />
        <Legend swatchClass="bg-neutral-300" label="Booked" />
      </div> */}

      <div className="rounded-xl">
        <div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex gap-2">
            <span className="rounded-md border border-neutral-300 bg-white px-2 py-1">
              Attendant
            </span>
            <span className="rounded-md border border-neutral-300 bg-white px-2 py-1">
              Driver
            </span>
          </div>
          <span>Front door</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {rows.map((row) => {
            const rowSeats = seats.filter((s) => s.row === row);
            const leftSeats = rowSeats.filter((s) => s.side === "left");
            const rightSeats = rowSeats.filter((s) => s.side === "right");
            const marker = rowMarkers.find((m) => m.afterRow === row);

            return (
              <div key={row}>
                <div
                  className="grid items-center justify-center gap-1.5"
                  style={{
                    gridTemplateColumns: `repeat(${leftSeats.length}, 40px) 75% repeat(${rightSeats.length}, 40px)`,
                  }}
                >
                  {leftSeats.map((seat) => (
                    <SeatButton
                      key={seat.number}
                      seat={seat}
                      isBooked={bookedSeats.includes(seat.number)}
                      isSelected={selected.has(seat.number)}
                      onClick={() => toggleSeat(seat.number)}
                    />
                  ))}
                  <span />
                  {rightSeats.map((seat) => (
                    <SeatButton
                      key={seat.number}
                      seat={seat}
                      isBooked={bookedSeats.includes(seat.number)}
                      isSelected={selected.has(seat.number)}
                      onClick={() => toggleSeat(seat.number)}
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
          {selected.size === 0
            ? "No seats selected"
            : `${selected.size} seat${selected.size > 1 ? "s" : ""} — ${[...selected].sort((a, b) => a - b).join(", ")}`}
        </span>
        <span className="text-lg font-medium">${total}</span>
      </div>

      <button
        type="button"
        disabled={selected.size === 0}
        onClick={() => onConfirm?.([...selected].sort((a, b) => a - b))}
        className="mt-3 w-full rounded-lg border border-neutral-300 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {selected.size === 0
          ? "Select seats to continue"
          : `Continue with ${selected.size} seat${selected.size > 1 ? "s" : ""}`}
      </button> */}
    </div>
  );
}

function SeatButton({
  seat,
  isBooked,
  isSelected,
  onClick,
}: {
  seat: Seat;
  isBooked: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={isBooked}
      onClick={onClick}
      aria-label={`Seat ${seat.number}${isBooked ? ", booked" : isSelected ? ", selected" : ""}`}
      className={[
        "h-[40px] w-[40px] rounded-md text-[10px] font-medium transition",
        isBooked
          ? "cursor-not-allowed border border-neutral-300 bg-neutral-300 text-neutral-500"
          : isSelected
            ? "bg-blue-600 text-white"
            : "border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400",
      ].join(" ")}
    >
      {seat.number}
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
