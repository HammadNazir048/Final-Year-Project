'use client';

const PersonalInfoPage = () => {
    const user = {
        name: 'Hammad Nazir',
        email: 'fa21-bcs-048@cuiatk.edu.pk',
        accountTier: 'Free',
        university: 'COMSATS University Islamabad, Attock Campus',
        registrationNumber: 'FA21-BCS-048',
        joined: 'September 2025',
    };

    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
            <div className="bg-black border border-gray-600 rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">Account Details</h1>
                <div className="space-y-5">
                    <Detail label="Name" value={user.name} />
                    <Detail label="Email" value={user.email} />
                    <Detail label="Account Tier" value={user.accountTier} />
                    <Detail label="University" value={user.university} />
                    <Detail label="Reg. No" value={user.registrationNumber} />
                    <Detail label="Joined" value={user.joined} />
                </div>
            </div>
        </div>
    );
};

const Detail = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-sm text-gray-400">{label}</span>
        <div className="mt-1">
            <span className="text-lg font-semibold text-white">{value}</span>
        </div>
    </div>
);

export default PersonalInfoPage;
