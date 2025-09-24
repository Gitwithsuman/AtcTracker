import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentModal = ({ isOpen, onClose, selectedPlan, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg border border-border shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Upgrade to {selectedPlan?.tier}
            </h3>
            <p className="text-sm text-muted-foreground">
              Complete your payment to unlock premium features
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Plan Summary */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body font-medium text-foreground">
              {selectedPlan?.tier} Plan
            </span>
            <span className="text-lg font-heading font-bold text-foreground">
              ₹{selectedPlan?.price?.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Billed {selectedPlan?.billingCycle}ly • Auto-renewal
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h4 className="text-sm font-body font-medium text-foreground mb-4">
            Choose Payment Method
          </h4>
          
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                paymentMethod === 'card' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <Icon name="CreditCard" size={20} color="var(--color-primary)" />
              <span className="font-body font-medium text-foreground">
                Credit/Debit Card
              </span>
            </button>
            
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                paymentMethod === 'upi' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <Icon name="Smartphone" size={20} color="var(--color-primary)" />
              <span className="font-body font-medium text-foreground">
                UPI Payment
              </span>
            </button>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <Input
                label="Cardholder Name"
                type="text"
                placeholder="Enter full name as on card"
                value={formData?.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e?.target?.value)}
                required
              />
              
              <Input
                label="Card Number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData?.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  type="text"
                  placeholder="MM/YY"
                  value={formData?.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
                  required
                />
                
                <Input
                  label="CVV"
                  type="text"
                  placeholder="123"
                  value={formData?.cvv}
                  onChange={(e) => handleInputChange('cvv', e?.target?.value)}
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="space-y-4">
              <Input
                label="UPI ID"
                type="text"
                placeholder="yourname@paytm"
                value={formData?.upiId}
                onChange={(e) => handleInputChange('upiId', e?.target?.value)}
                required
              />
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Info" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-body font-medium text-foreground">
                    UPI Payment
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You will be redirected to your UPI app to complete the payment
                </p>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="text-sm font-body text-success">
                Your payment is secured with 256-bit SSL encryption
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            <Button variant="outline" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              fullWidth 
              loading={isProcessing}
              onClick={handlePayment}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${selectedPlan?.price?.toLocaleString('en-IN')}`}
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;