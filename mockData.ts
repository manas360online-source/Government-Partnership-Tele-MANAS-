
import { Referral, ReferralStatus, ReferralSource, CrisisLevel, TherapyOutcome } from './types';

export const MOCK_REFERRALS: Referral[] = [
  {
    id: '1',
    referral_source: ReferralSource.TELE_MANAS,
    referral_id: 'TM-KA-2026-001234',
    referral_date: '2026-01-05',
    status: ReferralStatus.THERAPY_STARTED,
    patient: {
      name: "Rahul Kumar",
      age: 28,
      gender: "male",
      phone: "+91-9876543210",
      email: "rahul.k@example.com",
      location: "Dharwad, Karnataka"
    },
    clinical_context: {
      presenting_concern: "Moderate depression, work stress, sleep issues",
      phq9_score_at_referral: 14,
      gad7_score_at_referral: 10,
      crisis_level: CrisisLevel.MEDIUM,
      previous_treatment: "None",
      telemanas_counselor_name: "Dr. Priya Sharma",
      telemanas_session_date: "2026-01-04",
      telemanas_notes: "Patient open to therapy, motivated to improve"
    },
    outcome: {
      sessions_completed: 4,
      therapy_outcome: TherapyOutcome.IMPROVED,
      phq9_baseline: 14,
      phq9_final: 9,
      phq9_improvement: 5,
      gad7_baseline: 10,
      gad7_final: 6,
      gad7_improvement: 4,
      treatment_duration_weeks: 4
    }
  },
  {
    id: '2',
    referral_source: ReferralSource.TELE_MANAS,
    referral_id: 'TM-KA-2026-001235',
    referral_date: '2026-01-10',
    status: ReferralStatus.PENDING,
    patient: {
      name: "Anjali Devi",
      age: 34,
      gender: "female",
      phone: "+91-9887654321",
      email: "anjali.d@example.com",
      location: "Bangalore, Karnataka"
    },
    clinical_context: {
      presenting_concern: "Severe anxiety following post-partum",
      phq9_score_at_referral: 18,
      gad7_score_at_referral: 16,
      crisis_level: CrisisLevel.HIGH,
      previous_treatment: "Short-term counseling in 2022",
      telemanas_counselor_name: "Dr. Sandeep Singh",
      telemanas_session_date: "2026-01-09",
      telemanas_notes: "Requires immediate attention and follow-up"
    }
  },
  {
    id: '3',
    referral_source: ReferralSource.DMHP,
    referral_id: 'DMHP-2026-8821',
    referral_date: '2026-01-12',
    status: ReferralStatus.ACCEPTED,
    patient: {
      name: "Suresh Gowda",
      age: 45,
      gender: "male",
      phone: "+91-9123456789",
      email: "suresh.g@example.com",
      location: "Mysore, Karnataka"
    },
    clinical_context: {
      presenting_concern: "Alcohol withdrawal symptoms and mild depression",
      phq9_score_at_referral: 12,
      gad7_score_at_referral: 8,
      crisis_level: CrisisLevel.MEDIUM,
      previous_treatment: "De-addiction center 1 month ago",
      telemanas_counselor_name: "Dr. K. Venkatesh",
      telemanas_session_date: "2026-01-11",
      telemanas_notes: "Stable but needs psychotherapy"
    }
  }
];
