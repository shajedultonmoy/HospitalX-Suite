const bcrypt = require('bcryptjs');
const { User, Doctor, Department, Medicine } = require('./models');

const seedDatabase = async () => {
  console.log('🌱 Starting database seed runner...');
  
  // Create departments
  const departments = await Department.bulkCreate([
    { id: 1, name: 'Cardiology', description: 'Heart diagnostics, preventive cardiology, ECG, echo, and interventional care.' },
    { id: 2, name: 'Neurology', description: 'Care for stroke, epilepsy, migraine, movement disorders, and nerve health.' },
    { id: 3, name: 'Pediatrics', description: 'Child-centered preventive care, vaccination, growth tracking, and acute care.' },
    { id: 4, name: 'Orthopedics', description: 'Joint, bone, spine, trauma, and sports injury treatment.' },
    { id: 5, name: 'General Medicine', description: 'Primary care, chronic disease management, wellness screening, and referrals.' },
    { id: 6, name: 'Ophthalmology', description: 'Vision screening, eye disease diagnosis, cataract support, and retinal care.' }
  ], { ignoreDuplicates: true });
  
  console.log(`Sub-Task: Created/Verified departments`);
  
  // Create doctors
  await Doctor.bulkCreate([
    { 
      id: 1,
      name: 'Dr. Sarah Jenkins', 
      specialization: 'Cardiologist', 
      department_id: 1, 
      schedule: 'Mon-Wed 9:00 AM-2:00 PM', 
      contact: '+1-555-0101' 
    },
    { 
      id: 2,
      name: 'Dr. Michael Chen', 
      specialization: 'Neurologist', 
      department_id: 2, 
      schedule: 'Tue-Fri 10:00 AM-4:00 PM', 
      contact: '+1-555-0102' 
    },
    { 
      id: 3,
      name: 'Dr. Emily Carter', 
      specialization: 'Pediatric Consultant', 
      department_id: 3, 
      schedule: 'Mon-Fri 8:00 AM-3:00 PM', 
      contact: '+1-555-0103' 
    },
    { 
      id: 4,
      name: 'Dr. Robert Smith', 
      specialization: 'Orthopedic Surgeon', 
      department_id: 4, 
      schedule: 'Thu-Sat 9:00 AM-5:00 PM', 
      contact: '+1-555-0104' 
    }
  ], { ignoreDuplicates: true });
  
  console.log(`Sub-Task: Created/Verified doctors`);
  
  // Create medicines
  await Medicine.bulkCreate([
    { 
      id: 1,
      name: 'Paracetamol', 
      category: 'Analgesic', 
      usage: 'Used for fever and mild to moderate pain relief.', 
      description: 'Common over-the-counter medicine; follow dosage guidance carefully.', 
      dosage: '500 mg as directed', 
      stock: 220 
    },
    { 
      id: 2,
      name: 'Amoxicillin', 
      category: 'Antibiotic', 
      usage: 'Used for selected bacterial infections when prescribed.', 
      description: 'Complete the prescribed course and avoid self-medication.', 
      dosage: 'As prescribed', 
      stock: 80 
    },
    { 
      id: 3,
      name: 'Cetirizine', 
      category: 'Antihistamine', 
      usage: 'Used for allergy symptoms such as sneezing and itching.', 
      description: 'May cause drowsiness in some patients.', 
      dosage: '10 mg as directed', 
      stock: 140 
    },
    { 
      id: 4,
      name: 'Metformin', 
      category: 'Antidiabetic', 
      usage: 'Used to support blood glucose control in type 2 diabetes.', 
      description: 'Take under medical supervision with diet and monitoring.', 
      dosage: 'As prescribed', 
      stock: 95 
    }
  ], { ignoreDuplicates: true });
  
  console.log(`Sub-Task: Created/Verified medicines`);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  // Seed Users
  await User.bulkCreate([
    {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'Patient'
    },
    {
      id: 2,
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'Admin'
    },
    {
      id: 3,
      name: 'Doctor User',
      email: 'doctor@example.com',
      password: hashedPassword,
      role: 'Doctor'
    }
  ], { ignoreDuplicates: true });

  console.log(`Sub-Task: Seeded/Verified test users`);
  console.log('🎉 Database seed completed successfully!');
};

module.exports = seedDatabase;
