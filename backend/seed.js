require('dotenv').config();
const sequelize = require('./config/db');
const { User, Doctor, Department, Medicine, Appointment } = require('./models');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    // Create departments
    const departments = await Department.bulkCreate([
      { name: 'Cardiology', description: 'Heart diagnostics, preventive cardiology, ECG, echo, and interventional care.' },
      { name: 'Neurology', description: 'Care for stroke, epilepsy, migraine, movement disorders, and nerve health.' },
      { name: 'Pediatrics', description: 'Child-centered preventive care, vaccination, growth tracking, and acute care.' },
      { name: 'Orthopedics', description: 'Joint, bone, spine, trauma, and sports injury treatment.' },
      { name: 'General Medicine', description: 'Primary care, chronic disease management, wellness screening, and referrals.' },
      { name: 'Ophthalmology', description: 'Vision screening, eye disease diagnosis, cataract support, and retinal care.' }
    ], { ignoreDuplicates: true });
    
    console.log(`✅ Created ${departments.length} departments`);
    
    // Create doctors
    const doctors = await Doctor.bulkCreate([
      { 
        name: 'Dr. Sarah Jenkins', 
        specialization: 'Cardiologist', 
        department_id: 1, 
        schedule: 'Mon-Wed 9:00 AM-2:00 PM', 
        contact: '+1-555-0101' 
      },
      { 
        name: 'Dr. Michael Chen', 
        specialization: 'Neurologist', 
        department_id: 2, 
        schedule: 'Tue-Fri 10:00 AM-4:00 PM', 
        contact: '+1-555-0102' 
      },
      { 
        name: 'Dr. Emily Carter', 
        specialization: 'Pediatric Consultant', 
        department_id: 3, 
        schedule: 'Mon-Fri 8:00 AM-3:00 PM', 
        contact: '+1-555-0103' 
      },
      { 
        name: 'Dr. Robert Smith', 
        specialization: 'Orthopedic Surgeon', 
        department_id: 4, 
        schedule: 'Thu-Sat 9:00 AM-5:00 PM', 
        contact: '+1-555-0104' 
      }
    ], { ignoreDuplicates: true });
    
    console.log(`✅ Created ${doctors.length} doctors`);
    
    // Create medicines
    const medicines = await Medicine.bulkCreate([
      { 
        name: 'Paracetamol', 
        category: 'Analgesic', 
        usage: 'Used for fever and mild to moderate pain relief.', 
        description: 'Common over-the-counter medicine; follow dosage guidance carefully.', 
        dosage: '500 mg as directed', 
        stock: 220 
      },
      { 
        name: 'Amoxicillin', 
        category: 'Antibiotic', 
        usage: 'Used for selected bacterial infections when prescribed.', 
        description: 'Complete the prescribed course and avoid self-medication.', 
        dosage: 'As prescribed', 
        stock: 80 
      },
      { 
        name: 'Cetirizine', 
        category: 'Antihistamine', 
        usage: 'Used for allergy symptoms such as sneezing and itching.', 
        description: 'May cause drowsiness in some patients.', 
        dosage: '10 mg as directed', 
        stock: 140 
      },
      { 
        name: 'Metformin', 
        category: 'Antidiabetic', 
        usage: 'Used to support blood glucose control in type 2 diabetes.', 
        description: 'Take under medical supervision with diet and monitoring.', 
        dosage: 'As prescribed', 
        stock: 95 
      }
    ], { ignoreDuplicates: true });
    
    console.log(`✅ Created ${medicines.length} medicines`);
    
    console.log('🎉 Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

seedDatabase();
