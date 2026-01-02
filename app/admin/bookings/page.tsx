import BookingTable from "@/components/admin/BookingTable";

export default function BookingsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
                    <p className="text-gray-500 mt-1">View and manage all shipment orders</p>
                </div>
                <button className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Export CSV
                </button>
            </div>
            <BookingTable />
        </div>
    );
}
