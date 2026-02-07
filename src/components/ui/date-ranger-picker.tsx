// Core
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { FC, useState } from "react";

// App
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  value: { from: string; to: string };
  placeholder?: string;
  onChange: (date: { from: string; to: string }) => void;
}

// Component
const DateRangerPicker: FC<Props> = (props) => {
  // Props
  const { value, placeholder, onChange } = props;

  // States
  const [open, setOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>();
  const [toDate, setToDate] = useState<Date | null>();

  // Methods
  const handleApply = () => {
    if (!fromDate || !toDate) return;
    onChange({
      from: format(fromDate, "yyyy-MM-dd"),
      to: format(toDate, "yyyy-MM-dd"),
    });
    setOpen(false);
  };

  // Memos
  const formatDateRange = () => {
    if (!fromDate && !toDate) return placeholder ?? "Chọn khoảng ngày";

    return `${value.from ? format(value.from, "dd/MM/yyyy") : "..."} - ${value.to ? format(value.to, "dd/MM/yyyy") : "..."}`;
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-primary font-medium">Chọn khoảng ngày</h4>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div>
          <p className="mb-1 text-sm">Từ</p>
          <Calendar
            mode="single"
            selected={fromDate || undefined}
            onSelect={(date) => {
              if (date && toDate && date > toDate) {
                setToDate(null);
              }
              setFromDate(date || null);
            }}
            locale={vi}
          />
        </div>
        <div>
          <p className="mb-1 text-sm">Đến</p>
          <Calendar
            mode="single"
            selected={toDate || undefined}
            onSelect={(date) => setToDate(date || null)}
            disabled={{ before: fromDate || new Date() }}
            locale={vi}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setFromDate(null);
            setToDate(null);
          }}
        >
          Xóa
        </Button>
        <Button
          variant="default"
          size="sm"
          disabled={!fromDate || !toDate}
          onClick={handleApply}
        >
          Áp dụng
        </Button>
      </div>
    </div>
  );
};

export default DateRangerPicker;
