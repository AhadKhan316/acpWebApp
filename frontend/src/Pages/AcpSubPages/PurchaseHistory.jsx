import { useState, useEffect } from 'react';
import { FaHistory } from 'react-icons/fa';

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Mock data (replace with API call)
    const mockPurchases = [
      {
        id: 1,
        eventName: 'Arts Alumni Festival',
        amount: 1500,
        totalTickets: 2,
        eventDate: '2025-06-15',
        purchaseDate: '2025-06-04T17:36:00Z'
      },
      {
        id: 2,
        eventName: 'World Culture Festival',
        amount: 1000,
        totalTickets: 1,
        eventDate: '2025-07-01',
        purchaseDate: '2025-06-03T14:20:00Z'
      }
    ];
    setPurchases(mockPurchases);
    // Replace with actual API call
    // fetch('/api/purchase-history')
    //   .then(response => response.json())
    //   .then(data => setPurchases(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <FaHistory className="text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Purchase History</h1>
          </div>
          <p className="text-gray-600 mt-1">View your past ticket purchases.</p>
        </div>

        {/* Purchase History Table */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {purchases.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 text-sm font-medium text-gray-700">
                    <th className="py-2 px-4">Event Name</th>
                    <th className="py-2 px-4">Amount (RS)</th>
                    <th className="py-2 px-4">Tickets</th>
                    <th className="py-2 px-4">Event Date</th>
                    <th className="py-2 px-4">Purchase Date</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id} className="border-t text-sm text-gray-800">
                      <td className="py-2 px-4">{purchase.eventName}</td>
                      <td className="py-2 px-4">{purchase.amount.toFixed(2)}</td>
                      <td className="py-2 px-4">{purchase.totalTickets}</td>
                      <td className="py-2 px-4">{new Date(purchase.eventDate).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{new Date(purchase.purchaseDate).toLocaleString('en-US', { timeZone: 'Asia/Karachi' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600">
              <p>No purchase history available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;