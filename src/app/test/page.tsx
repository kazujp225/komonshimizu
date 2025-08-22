export default function TestPage() {
  return (
    <div style={{ 
      padding: '50px',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      fontSize: '24px',
      textAlign: 'center' as const
    }}>
      <h1 style={{ color: 'green', marginBottom: '20px' }}>
        ✅ TEST SUCCESS
      </h1>
      <p style={{ color: 'blue' }}>
        Next.jsは正常に動作しています
      </p>
      <p>時刻: {new Date().toLocaleString()}</p>
    </div>
  );
}