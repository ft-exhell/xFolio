const ETH_MAINNET = 'https://palpable-silent-mountain.discover.quiknode.pro/588067af41aee3e0356634653bac111bf9fa8cf2/';


export default function handler(req, res) {
    console.log(req.query)
    res.status(200).json({ name: 'John Doe' })
  }