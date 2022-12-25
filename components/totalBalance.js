import useSWR from 'swr';

export default function TotalBalance({ balances }) {
    // const fetcher = (...args) => fetch(...args).then(res => res.json())
    // const { data, error, isLoading } = useSWR('https://blockchain.info/rawaddr/bc1qxhmdufsvnuaaaer4ynz88fspdsxq2h9e9cetdj', fetcher)
    
    // if (error) return <div>failed to load</div>
    // if (isLoading) return <div>loading...</div>
  
    // // render data
    // return <div>hello {data.name}!</div>
    return(
        <div>
            <h2 className="font-medium leading-tight text-3xl">Your total balance is</h2>
        </div>
    )
}