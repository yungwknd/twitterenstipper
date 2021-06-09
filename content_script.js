// Wait for page to load
setTimeout(async function () {
  let account
  const provider = await detectEthereumProvider()
  if (provider) {
    await provider.request({
      method: 'eth_requestAccounts'
    })

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    account = accounts[0]
  } else {
    console.log('No ethereum provider attached')
  }
  // dark mode username element
  let elements = document.getElementsByClassName("css-901oao r-1fmj7o5 r-1qd0xha r-adyw6z r-1vr29t4 r-135wba7 r-bcqeeo r-1udh08x r-qvutc0")
  // light mode username element
  if (elements.length < 1) {
    elements = document.getElementsByClassName("css-901oao r-18jsvk2 r-1qd0xha r-adyw6z r-1vr29t4 r-135wba7 r-bcqeeo r-1udh08x r-qvutc0")
  }

  // dim mode username element
  if (elements.length < 1) {
    elements = document.getElementsByClassName("css-901oao r-jwli3a r-1qd0xha r-adyw6z r-1vr29t4 r-135wba7 r-bcqeeo r-1udh08x r-qvutc0")
  }

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    for (let j = 0; j < element.childNodes.length; j++) {
        const node = element.childNodes[j];
        const username = node.textContent;

        if (username?.includes(".eth")) {
          const newDiv = document.createElement('div')
          const newA = document.createElement('a')
          const newDiv2 = document.createElement('div')
          const newSpan = document.createElement('span')
          const newSpan2 = document.createElement('span2')

          const inputInput = document.createElement('input')
          inputInput.type = "text"
          inputInput.placeholder = "0.1"
          inputInput.className = "r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu"
          inputInput.style.color = 'rgb(29, 161, 242)'
          inputInput.size = 5
          inputInput.style.border = 0
          inputInput.id = "howMuchETHToTip"

          newSpan2.innerHTML = 'Tip'
          newSpan2.className = "css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"

          newSpan.appendChild(inputInput)

          newSpan.className = "css-901oao css-16my406 css-bfa6kz r-poiln3 r-bcqeeo r-qvutc0"

          newDiv2.appendChild(newSpan)
          newDiv2.appendChild(newSpan2)
          newDiv2.className = "css-901oao r-1awozwy r-13gxpu9 r-6koalj r-18u37iz r-16y2uox r-1qd0xha r-a023e6 r-b88u0q r-1777fci r-rjixqe r-dnmrzs r-bcqeeo r-q4m81j r-qvutc0"

          newA.appendChild(newDiv2)
          newA.className = "css-4rbku5 css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1loqt21 r-1w2pmg r-6gpygo r-ero68b r-1gg2371 r-1ny4l3l r-1fneopy r-o7ynqc r-6416eg r-lrvibr"

          newDiv.appendChild(newA)
          newDiv.className = "css-1dbjc4n r-obd0qt r-18u37iz r-1w6e6rj r-1h0z5md r-dnmrzs"
          newDiv.style.marginLeft = '-70px'

          newSpan2.onclick = async () => {
            if(provider) {
              const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
              const resolveTo = await ethersProvider.resolveName(username.trim())
              const value = document.getElementById('howMuchETHToTip').value + ''
              const transactionParameters = {
                to: resolveTo,
                from: account,
                value: value ? ethers.utils.hexlify(ethers.utils.parseEther(`${value}`)) :'0x00'
              }
              await provider.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters]
              })
            }
          }
          const whereToPut = document.getElementsByClassName('css-1dbjc4n r-obd0qt r-18u37iz r-1w6e6rj r-1wtj0ep')[0]
          whereToPut.appendChild(newDiv)
        }
      }
  }
}, 5000)
