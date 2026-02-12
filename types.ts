
export enum ReferralStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  PATIENT_ONBOARDED = 'patient_onboarded',
  THERAPY_STARTED = 'therapy_started',
  DECLINED = 'declined'
}

export enum ReferralSource {
  TELE_MANAS = 'tele_manas',
  DMHP = 'dmhp',
  ASHA_WORKER = 'asha_worker'
}

export enum CrisisLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum TherapyOutcome {
  IMPROVED = 'improved',
  NO_CHANGE = 'no_change',
  WORSENED = 'worsened',
  DROPPED_OUT = 'dropped_out'
}

export interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  location: string;
}

export interface ClinicalContext {
  presenting_concern: string;
  phq9_score_at_referral: number;
  gad7_score_at_referral: number;
  crisis_level: CrisisLevel;
  previous_treatment: string;
  telemanas_counselor_name: string;
  telemanas_session_date: string;
  telemanas_notes: string;
}

export interface OutcomeTracking {
  first_session_date?: string;
  sessions_completed: number;
  therapy_outcome: TherapyOutcome;
  phq9_baseline: number;
  phq9_final?: number;
  phq9_improvement?: number;
  gad7_baseline: number;
  gad7_final?: number;
  gad7_improvement?: number;
  treatment_duration_weeks?: number;
  discharge_date?: string;
}

export interface Referral {
  id: string;
  referral_source: ReferralSource;
  referral_id: string;
  referral_date: string;
  patient: PatientInfo;
  clinical_context: ClinicalContext;
  status: ReferralStatus;
  outcome?: OutcomeTracking;
  accepted_at?: string;
  declined_reason?: string;
}

export interface QuarterlyReport {
  id: string;
  report_period_start: string;
  report_period_end: string;
  report_quarter: string;
  status: 'draft' | 'finalized' | 'sent' | 'acknowledged';
  summary: {
    total_referrals: number;
    total_accepted: number;
    total_sessions: number;
    improvement_rate: number;
    avg_phq9_improvement: number;
  };
  report_pdf_url?: string;
  generated_at: string;
}
