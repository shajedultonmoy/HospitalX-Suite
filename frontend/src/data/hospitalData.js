export const departments = [
  {
    id: 1,
    name: 'Cardiology',
    description: 'Heart diagnostics, ECG, echo, preventive cardiology, and interventional care.',
    icon: 'HeartPulse',
    availability: '24/7 emergency response'
  },
  {
    id: 2,
    name: 'Neurology',
    description: 'Stroke care, epilepsy management, migraine treatment, and nerve health services.',
    icon: 'Brain',
    availability: 'Specialist clinic Tue-Fri'
  },
  {
    id: 3,
    name: 'Pediatrics',
    description: 'Child-focused preventive care, vaccinations, growth tracking, and acute treatment.',
    icon: 'Baby',
    availability: 'Daily pediatric desk'
  },
  {
    id: 4,
    name: 'Orthopedics',
    description: 'Joint, bone, trauma, sports injury, spine, and rehabilitation support.',
    icon: 'Bone',
    availability: 'Surgery and rehab wing'
  },
  {
    id: 5,
    name: 'General Medicine',
    description: 'Primary care, wellness screening, chronic disease care, and referrals.',
    icon: 'ShieldPlus',
    availability: 'Walk-in support'
  },
  {
    id: 6,
    name: 'Ophthalmology',
    description: 'Vision screening, eye disease diagnosis, retinal care, and cataract support.',
    icon: 'Eye',
    availability: 'Diagnostic suite open daily'
  }
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    specialization: 'Cardiologist',
    department: 'Cardiology',
    schedule: 'Mon-Wed, 9:00 AM-2:00 PM',
    contact: '+1-555-0101',
    experience: '15 years',
    availability: 'Available today',
    rating: '4.9'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    department: 'Neurology',
    schedule: 'Tue-Fri, 10:00 AM-4:00 PM',
    contact: '+1-555-0102',
    experience: '10 years',
    availability: 'Next slot tomorrow',
    rating: '4.8'
  },
  {
    id: 3,
    name: 'Dr. Emily Carter',
    specialization: 'Pediatric Consultant',
    department: 'Pediatrics',
    schedule: 'Mon-Fri, 8:00 AM-3:00 PM',
    contact: '+1-555-0103',
    experience: '8 years',
    availability: 'Available today',
    rating: '4.9'
  },
  {
    id: 4,
    name: 'Dr. Robert Smith',
    specialization: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    schedule: 'Thu-Sat, 9:00 AM-5:00 PM',
    contact: '+1-555-0104',
    experience: '20 years',
    availability: 'Limited slots',
    rating: '4.7'
  },
  {
    id: 5,
    name: 'Dr. Amina Rahman',
    specialization: 'Internal Medicine Specialist',
    department: 'General Medicine',
    schedule: 'Sun-Thu, 11:00 AM-6:00 PM',
    contact: '+1-555-0105',
    experience: '12 years',
    availability: 'Available today',
    rating: '4.8'
  },
  {
    id: 6,
    name: 'Dr. Luis Alvarez',
    specialization: 'Ophthalmologist',
    department: 'Ophthalmology',
    schedule: 'Mon-Thu, 9:30 AM-1:30 PM',
    contact: '+1-555-0106',
    experience: '11 years',
    availability: 'Next slot Friday',
    rating: '4.6'
  }
];

export const medicines = [
  {
    id: 1,
    name: 'Paracetamol',
    category: 'Analgesic',
    usage: 'Fever and mild to moderate pain relief.',
    description: 'Common over-the-counter medicine; follow dosage guidance carefully.',
    dosage: '500 mg as directed',
    stock: 220
  },
  {
    id: 2,
    name: 'Amoxicillin',
    category: 'Antibiotic',
    usage: 'Selected bacterial infections when prescribed.',
    description: 'Complete the prescribed course and avoid self-medication.',
    dosage: 'As prescribed',
    stock: 80
  },
  {
    id: 3,
    name: 'Cetirizine',
    category: 'Antihistamine',
    usage: 'Allergy symptoms such as sneezing, itching, and watery eyes.',
    description: 'May cause drowsiness in some patients.',
    dosage: '10 mg as directed',
    stock: 140
  },
  {
    id: 4,
    name: 'Metformin',
    category: 'Antidiabetic',
    usage: 'Blood glucose control in type 2 diabetes.',
    description: 'Take under medical supervision with diet and monitoring.',
    dosage: 'As prescribed',
    stock: 95
  },
  {
    id: 5,
    name: 'Omeprazole',
    category: 'Gastrointestinal',
    usage: 'Acid reflux and stomach acid reduction.',
    description: 'Best taken before meals unless a clinician advises otherwise.',
    dosage: '20 mg as directed',
    stock: 115
  }
];
