import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VeterinaryConsultationCard = ({ animalId, healthScore }) => {
  const [selectedVet, setSelectedVet] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const veterinarians = [
    {
      id: 'vet1',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Large Animal Medicine',
      experience: '15 years',
      rating: 4.8,
      availability: 'Available Today',
      phone: '+91 98765 43210'
    },
    {
      id: 'vet2',
      name: 'Dr. Priya Sharma',
      specialization: 'Bovine Health & Nutrition',
      experience: '12 years',
      rating: 4.9,
      availability: 'Available Tomorrow',
      phone: '+91 98765 43211'
    },
    {
      id: 'vet3',
      name: 'Dr. Amit Patel',
      specialization: 'Livestock Reproduction',
      experience: '18 years',
      rating: 4.7,
      availability: 'Available This Week',
      phone: '+91 98765 43212'
    }
  ];

  const consultationTypes = [
    { value: 'routine', label: 'Routine Check-up', description: 'General health assessment' },
    { value: 'urgent', label: 'Urgent Consultation', description: 'Immediate health concerns' },
    { value: 'follow-up', label: 'Follow-up Visit', description: 'Post-treatment review' },
    { value: 'vaccination', label: 'Vaccination', description: 'Immunization schedule' }
  ];

  const handleBookConsultation = async () => {
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      alert(`Consultation booked successfully!\nVeterinarian: ${veterinarians?.find(v => v?.id === selectedVet)?.name}\nDate: ${preferredDate}\nType: ${consultationTypes?.find(t => t?.value === consultationType)?.label}`);
    }, 2000);
  };

  const isUrgentCase = healthScore < 50;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
          isUrgentCase ? 'bg-error/10' : 'bg-primary/10'
        }`}>
          <Icon 
            name="Stethoscope" 
            size={24} 
            color={isUrgentCase ? 'var(--color-error)' : 'var(--color-primary)'} 
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Veterinary Consultation</h3>
          <p className="text-sm text-muted-foreground">
            Book professional consultation for Animal #{animalId}
          </p>
        </div>
      </div>
      {isUrgentCase && (
        <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
            <span className="text-sm font-medium text-error">Urgent Consultation Recommended</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on the health assessment score ({healthScore}/100), immediate veterinary attention is advised.
          </p>
        </div>
      )}
      <div className="space-y-6">
        {/* Consultation Type Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Consultation Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {consultationTypes?.map((type) => (
              <button
                key={type?.value}
                onClick={() => setConsultationType(type?.value)}
                className={`p-3 text-left border rounded-lg transition-all duration-200 ${
                  consultationType === type?.value
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="text-sm font-medium text-foreground">{type?.label}</div>
                <div className="text-xs text-muted-foreground">{type?.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Veterinarian Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Select Veterinarian
          </label>
          <div className="space-y-3">
            {veterinarians?.map((vet) => (
              <button
                key={vet?.id}
                onClick={() => setSelectedVet(vet?.id)}
                className={`w-full p-4 text-left border rounded-lg transition-all duration-200 ${
                  selectedVet === vet?.id
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-foreground">{vet?.name}</div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} color="var(--color-warning)" />
                    <span className="text-xs text-muted-foreground">{vet?.rating}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mb-1">{vet?.specialization}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{vet?.experience} experience</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    vet?.availability?.includes('Today') 
                      ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}>
                    {vet?.availability}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Date */}
        <div>
          <Input
            type="date"
            label="Preferred Date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e?.target?.value)}
            min={new Date()?.toISOString()?.split('T')?.[0]}
            required
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e?.target?.value)}
            placeholder="Describe specific concerns or symptoms..."
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
        </div>

        {/* Booking Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant={isUrgentCase ? "destructive" : "default"}
            onClick={handleBookConsultation}
            disabled={!selectedVet || !consultationType || !preferredDate || isBooking}
            loading={isBooking}
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
          >
            {isUrgentCase ? 'Book Urgent Consultation' : 'Book Consultation'}
          </Button>
          
          {selectedVet && (
            <Button
              variant="outline"
              iconName="Phone"
              iconPosition="left"
              onClick={() => {
                const vet = veterinarians?.find(v => v?.id === selectedVet);
                window.open(`tel:${vet?.phone}`, '_self');
              }}
            >
              Call Now
            </Button>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Phone" size={14} color="var(--color-error)" />
            <span className="text-sm font-medium text-foreground">Emergency Contact</span>
          </div>
          <p className="text-xs text-muted-foreground">
            For immediate emergencies, call: <strong>+91 1800-XXX-XXXX</strong> (24/7 Veterinary Helpline)
          </p>
        </div>
      </div>
    </div>
  );
};

export default VeterinaryConsultationCard;