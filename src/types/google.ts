/**
 * SheetSync — Google API Types
 */

/** A Google Spreadsheet summary */
export interface GoogleSpreadsheet {
  id: string;
  name: string;
  url: string;
  modifiedTime: string;
}

/** A tab/sheet within a spreadsheet */
export interface GoogleSheetTab {
  sheetId: number;
  title: string;
  index: number;
  rowCount: number;
  columnCount: number;
}

/** Google connection status */
export interface GoogleConnectionStatus {
  connected: boolean;
  email: string | null;
  expiresAt: string | null;
}

/** Actions for the google-sheets edge function */
export type GoogleSheetsAction =
  | 'list_spreadsheets'
  | 'list_tabs'
  | 'read_rows'
  | 'write_rows'
  | 'update_cells'
  | 'create_tab';

/** Request payload for google-sheets edge function */
export interface GoogleSheetsRequest {
  action: GoogleSheetsAction;
  spreadsheetId?: string;
  tabName?: string;
  rows?: string[][];
  updates?: CellUpdate[];
  newTabName?: string;
  headers?: string[];
}

/** A single cell update */
export interface CellUpdate {
  row: number;
  column: number;
  value: string;
}

/** Response from list_spreadsheets */
export interface ListSpreadsheetsResponse {
  spreadsheets: GoogleSpreadsheet[];
}

/** Response from list_tabs */
export interface ListTabsResponse {
  tabs: GoogleSheetTab[];
}

/** Response from read_rows */
export interface ReadRowsResponse {
  headers: string[];
  rows: Record<string, string>[];
  totalRows: number;
}
