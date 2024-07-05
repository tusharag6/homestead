import { format } from "date-fns";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";

interface DateRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

interface DatePickerProps {
  onDateChange: (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [range, setRange] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onClear = React.useCallback(() => {
    const clearedRange = { startDate: undefined, endDate: undefined };
    setRange(clearedRange);
    onDateChange(undefined, undefined);
  }, [onDateChange]);

  const onChange = React.useCallback(
    ({ startDate, endDate }: DateRange) => {
      setRange({ startDate, endDate });
      onDateChange(startDate, endDate);
    },
    [onDateChange]
  );

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "MMM d") : "";
  };

  const selectedDates =
    range.startDate && range.endDate
      ? `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`
      : "Select dates";

  return (
    <View>
      <Text style={styles.footerDate} onPress={() => setOpen(true)}>
        {selectedDates}
      </Text>
      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onClear}
        onChange={onChange}
        saveLabel="Clear Dates"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footerDate: {
    fontSize: 12,
    fontFamily: "mon",
    textDecorationLine: "underline",
  },
});

export default DatePicker;
