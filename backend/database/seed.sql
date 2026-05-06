USE hospitalx_suite;

INSERT INTO departments (id, name, description) VALUES
(1, 'Cardiology', 'Heart diagnostics, preventive cardiology, ECG, echo, and interventional care.'),
(2, 'Neurology', 'Care for stroke, epilepsy, migraine, movement disorders, and nerve health.'),
(3, 'Pediatrics', 'Child-centered preventive care, vaccination, growth tracking, and acute care.'),
(4, 'Orthopedics', 'Joint, bone, spine, trauma, and sports injury treatment.'),
(5, 'General Medicine', 'Primary care, chronic disease management, wellness screening, and referrals.'),
(6, 'Ophthalmology', 'Vision screening, eye disease diagnosis, cataract support, and retinal care.')
ON DUPLICATE KEY UPDATE description = VALUES(description);

INSERT INTO doctors (id, name, specialization, department_id, schedule, contact) VALUES
(1, 'Dr. Sarah Jenkins', 'Cardiologist', 1, 'Mon-Wed 9:00 AM-2:00 PM', '+1-555-0101'),
(2, 'Dr. Michael Chen', 'Neurologist', 2, 'Tue-Fri 10:00 AM-4:00 PM', '+1-555-0102'),
(3, 'Dr. Emily Carter', 'Pediatric Consultant', 3, 'Mon-Fri 8:00 AM-3:00 PM', '+1-555-0103'),
(4, 'Dr. Robert Smith', 'Orthopedic Surgeon', 4, 'Thu-Sat 9:00 AM-5:00 PM', '+1-555-0104')
ON DUPLICATE KEY UPDATE schedule = VALUES(schedule), contact = VALUES(contact);

INSERT INTO medicines (id, name, category, usage, description, dosage, stock) VALUES
(1, 'Paracetamol', 'Analgesic', 'Used for fever and mild to moderate pain relief.', 'Common over-the-counter medicine; follow dosage guidance carefully.', '500 mg as directed', 220),
(2, 'Amoxicillin', 'Antibiotic', 'Used for selected bacterial infections when prescribed.', 'Complete the prescribed course and avoid self-medication.', 'As prescribed', 80),
(3, 'Cetirizine', 'Antihistamine', 'Used for allergy symptoms such as sneezing and itching.', 'May cause drowsiness in some patients.', '10 mg as directed', 140),
(4, 'Metformin', 'Antidiabetic', 'Used to support blood glucose control in type 2 diabetes.', 'Take under medical supervision with diet and monitoring.', 'As prescribed', 95)
ON DUPLICATE KEY UPDATE stock = VALUES(stock);
