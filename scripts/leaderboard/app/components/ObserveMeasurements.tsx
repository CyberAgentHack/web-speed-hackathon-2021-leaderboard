import { supabaseClient } from "~/libs/supabase.client";
import { useEffect } from "react";
import { useDataRefresh } from "remix-utils";

export const ObserveMeasurementsAndRefresh = () => {
  const { refresh } = useDataRefresh();
  useEffect(() => {
    const subscribe = supabaseClient
      .from("Measurement")
      .on("INSERT", () => {
        refresh();
      })
      .subscribe();
    return () => {
      subscribe.unsubscribe();
    };
  }, [refresh]);
  return null;
};
