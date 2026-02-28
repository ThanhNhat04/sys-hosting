import axiosClient from './axiosClient';
import { ENDPOINTS } from './endpoints';

export const financeService = {
  listInvoices: () => axiosClient.get(ENDPOINTS.FINANCE.INVOICES),
  listMyInvoices: () => axiosClient.get(ENDPOINTS.FINANCE.MY_INVOICES),
  getInvoice: (id) => axiosClient.get(ENDPOINTS.FINANCE.INVOICE_ID(id)),
  cancelInvoice: (id) => axiosClient.delete(ENDPOINTS.FINANCE.INVOICE_ID(id)),
  payInvoice: (id) => axiosClient.post(ENDPOINTS.FINANCE.PAY(id)),

  checkVoucher: (code) => axiosClient.post(ENDPOINTS.FINANCE.VOUCHERS_CHECK, { code }),
  listMyVouchers: () => axiosClient.get(ENDPOINTS.FINANCE.VOUCHERS_MY),
};
