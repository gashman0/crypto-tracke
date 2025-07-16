import React from 'react'

const CryptoList = () => {
  return (
    <>
        <main className='container'>
            <div class="crypto-table">
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>Market Cap</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td> Bitcoin</td>
                        <td>$61,200</td>
                        <td class="positive">+2.45%</td>
                        <td>$1.2T</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td> Ethereum</td>
                        <td>$3,250</td>
                        <td class="negative">-1.15%</td>
                        <td>$390B</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td> Solana</td>
                        <td>$3,250</td>
                        <td class="positive">+1.65%</td>
                        <td>$690B</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td> XRP</td>
                        <td>$50</td>
                        <td class="negative">-0.15%</td>
                        <td>$4B</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </>
  )
}

export default CryptoList