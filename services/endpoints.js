const V1 = '/api/v1';

export const ENDPOINTS = {
  HEALTH: '/health',
  AUTH: { LOGIN: `${V1}/auth/login` },
  USERS: {
    ME: `${V1}/users/me`,
    BASE: `${V1}/users`,
    ID: (id) => `${V1}/users/${id}`,
  },
  REFERRALS: {
    BASE: `${V1}/referrals`,
    MY: `${V1}/referrals/my`,
    CLAIM: `${V1}/referrals/claim`,
  },
  HOSTING: {
    SERVERS: `${V1}/servers`,
    SERVER_ID: (id) => `${V1}/servers/${id}`,
    PLANS: `${V1}/plans`,
    PLAN_ID: (id) => `${V1}/plans/${id}`,
    USER_SERVICES: `${V1}/user-services`,
    SERVICE_ID: (id) => `${V1}/user-services/${id}`,
    RENEW: (id) => `${V1}/user-services/${id}/renew`,
  },
  PROJECTS: {
    BASE: `${V1}/projects`,
    ID: (id) => `${V1}/projects/${id}`,
    MILESTONES: `${V1}/milestones`,
    MILESTONE_ID: (id) => `${V1}/milestones/${id}`,
  },
  FINANCE: {
    INVOICES: `${V1}/invoices`,
    MY_INVOICES: `${V1}/invoices/my`,
    INVOICE_ID: (id) => `${V1}/invoices/${id}`,
    PAY: (id) => `${V1}/invoices/${id}/pay`,
    VOUCHERS_CHECK: `${V1}/vouchers/check`,
    VOUCHERS_MY: `${V1}/vouchers/my`,
  },
  TICKETS: {
    BASE: `${V1}/tickets`,
    ID: (id) => `${V1}/tickets/${id}`,
    REPLIES: (id) => `${V1}/tickets/${id}/replies`,
    REPLY_ACTION: (id) => `${V1}/tickets/${id}/reply`,
  }
};
