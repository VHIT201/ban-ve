// Core
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { FC, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

// App
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  value?: {
    from?: string;
    to?: string;
  };
  placeholder?: string;
  onChange: (date: { from: string; to: string }) => void;
}

const DateRangePicker: FC<Props> = ({
  value,
  placeholder = "Chọn khoảng ngày",
  onChange,
}) => {
  // Internal range state
  const [range, setRange] = useState<DateRange | undefined>();

  // Sync external value → internal DateRange
  useEffect(() => {
    if (value?.from && value?.to) {
      setRange({
        from: parseISO(value.from),
        to: parseISO(value.to),
      });
    }
  }, [value]);

  const handleApply = () => {
    if (!range?.from || !range?.to) return;

    onChange({
      from: format(range.from, "yyyy-MM-dd"),
      to: format(range.to, "yyyy-MM-dd"),
    });
  };

  const handleClear = () => {
    setRange(undefined);
  };

  const renderLabel = () => {
    if (!range?.from) return placeholder;

    if (!range.to) return format(range.from, "dd/MM/yyyy", { locale: vi });

    return `${format(range.from, "dd/MM/yyyy", {
      locale: vi,
    })} - ${format(range.to, "dd/MM/yyyy", { locale: vi })}`;
  };

  return (
    <div className="p-4 space-y-4">
      <h4 className="text-primary font-medium">{renderLabel()}</h4>

      <Calendar
        mode="range"
        numberOfMonths={2}
        locale={vi}
        selected={range}
        onSelect={setRange}
      />

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleClear}>
          Xóa
        </Button>

        <Button
          size="sm"
          disabled={!range?.from || !range?.to}
          onClick={handleApply}
        >
          Áp dụng
        </Button>
      </div>
    </div>
  );
};

export default DateRangePicker;
