import { Bars } from 'react-loader-spinner'

export const Loader = () => (<Bars
  height="80"
  width="80"
  color="#3f51b5"
  ariaLabel="bars-loading"
  wrapperStyle={{margin: "auto",}}
  wrapperClass=""
  visible={true}
/>)