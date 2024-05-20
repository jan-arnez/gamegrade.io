"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataSource } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface SelectOptionsProps {
  id: string;
  onSelectChange: (value: string) => void;
}

const fetchData = async (gameId: string) => {
  const response = await fetch(`/api/data-source/${gameId}`);
  const json: DataSource = await response.json();
  return json.data.length || 0;
};

const SelectOptions: React.FC<SelectOptionsProps> = ({
  id,
  onSelectChange,
}) => {
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    fetchData(id).then(setDataLength);
  }, [id]);

  const options = [];
  if (dataLength)
    options.push(
      <SelectItem key="10" value="10">
        10 Questions - 5 tokens
      </SelectItem>,
    );
  if (dataLength >= 9000)
    options.push(
      <SelectItem key="15" value="15">
        15 Questions - 8 tokens
      </SelectItem>,
    );
  if (dataLength >= 12000)
    options.push(
      <SelectItem key="20" value="20">
        20 Questions - 10 tokens
      </SelectItem>,
    );
  if (dataLength >= 15000)
    options.push(
      <SelectItem key="25" value="25">
        25 Questions - 13 tokens
      </SelectItem>,
    );
  if (dataLength >= 18000)
    options.push(
      <SelectItem key="30" value="30">
        30 Questions - 15 tokens
      </SelectItem>,
    );

  return (
    <Select name="questionsAmount" required onValueChange={onSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Number of Questions" />
      </SelectTrigger>
      <SelectContent>{options}</SelectContent>
    </Select>
  );
};

export default SelectOptions;
