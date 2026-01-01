'use client';

export default function TestPage() {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Click Test Page</h1>
            <button
                onClick={() => {
                    alert('✅ BUTTON WORKS!');
                    console.log('✅ Button clicked successfully!');
                }}
                style={{
                    padding: '20px 40px',
                    fontSize: '24px',
                    background: 'lime',
                    border: '5px solid black',
                    cursor: 'pointer',
                    margin: '20px'
                }}
            >
                CLICK ME - TEST 1
            </button>

            <div
                onClick={() => {
                    alert('✅ DIV WORKS!');
                    console.log('✅ Div clicked successfully!');
                }}
                style={{
                    padding: '50px',
                    background: 'yellow',
                    border: '5px solid red',
                    cursor: 'pointer',
                    margin: '20px',
                    fontSize: '20px'
                }}
            >
                CLICK THIS DIV - TEST 2
            </div>
        </div>
    );
}
