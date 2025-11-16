"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { Download } from "lucide-react";
import z from "zod";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import axiosInstance from "@/lib/api/client";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { recentLeadsColumns } from "./columns.crm";
import { recentLeadSchema } from "./schema";

type LeadRow = z.infer<typeof recentLeadSchema>;

type LeadApiResponse = {
  _id: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  propertyIntent?: string;
  createdAt?: string;
};

const formatDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
};

const generateRowId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2, 11);

const formatName = (lead: LeadApiResponse) => {
  const name = [lead.firstName, lead.lastName].filter(Boolean).join(" ").trim();
  return name.length ? name : lead.email ?? "Unknown lead";
};

const toRow = (lead: LeadApiResponse): LeadRow => ({
  id: lead._id ?? generateRowId(),
  name: formatName(lead),
  email: lead.email ?? "—",
  phone: lead.mobile ?? "—",
  intent: lead.propertyIntent ? lead.propertyIntent.replace(/^\w/, (c) => c.toUpperCase()) : "Unknown",
  createdAt: formatDate(lead.createdAt),
});

export function TableCards() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await axiosInstance.get<LeadApiResponse[]>("/leads");
        const mapped = response.data?.map((lead) => toRow(lead)) ?? [];
        setLeads(mapped);
      } catch (error) {
        const message = axios.isAxiosError(error)
          ? error.response?.data?.message ?? "Unable to fetch leads."
          : "Unable to fetch leads.";
        setErrorMessage(message);
        setLeads([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const table = useDataTableInstance({
    data: leads,
    columns: recentLeadsColumns,
    getRowId: (row) => row.id,
  });

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>Track and manage your latest leads and their status.</CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <DataTableViewOptions table={table} />
              <Button variant="outline" size="sm">
                <Download />
                <span className="hidden lg:inline">Export</span>
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex size-full flex-col gap-4">
          {isLoading ? (
            <div className="text-muted-foreground flex min-h-[200px] items-center justify-center text-sm">
              Loading recent leads...
            </div>
          ) : errorMessage ? (
            <div className="text-destructive flex min-h-[200px] items-center justify-center text-sm">{errorMessage}</div>
          ) : (
            <>
              <div className="overflow-hidden rounded-md border">
                <DataTable table={table} columns={recentLeadsColumns} />
              </div>
              <DataTablePagination table={table} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
