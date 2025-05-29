import ReactDOM from 'react-dom/client'
import Main from "components/pages/Main"

ReactDOM.createRoot(document.getElementById('root')!).render(<Main children />)

export default function(){
  return(
    <Main children />
  )
}