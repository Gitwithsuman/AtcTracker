import React from 'react';
import Icon from '../../../components/ui/AppIcon';
import Image from '../../../components/ui/AppImage';

const AnimalImageAnalysis = ({ imageUrl, imageName, measurements }) => {

  const measurementPoints = [
    { id: 1, label: 'Height at Withers', value: '142 cm' },
    { id: 2, label: 'Body Length', value: '165 cm' },
    { id: 3, label: 'Chest Width', value: '68 cm' },
    { id: 4, label: 'Rump Angle', value: '28°' },
    { id: 5, label: 'Face Length', value: '28 cm' },
    { id: 6, label: 'Neck Length', value: '42 cm' },
    { id: 7, label: 'Hip Height', value: '138 cm' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
          <Icon name="Camera" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Image Analysis</h3>
          <p className="text-sm text-muted-foreground">
            {imageName && imageName !== 'Sample Cattle' ? `${imageName} • ` : 'Sample image • '}
            Analyzed on {new Date()?.toLocaleDateString('en-IN')}
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
        <Image
          src={imageUrl}
          alt="Analyzed animal"
          className="w-full h-80 object-contain"
        />
      </div>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {measurementPoints?.map((point) => (
          <div key={point?.id} className="bg-muted rounded-lg p-3">
            <p className="text-xs text-muted-foreground">{point?.label}</p>
            <p className="text-sm font-semibold text-foreground">{point?.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalImageAnalysis;