export const sortingMovies = (moviesArr:any, sortby)=>{
  const sortArr = moviesArr.sort((a,b)=>(+a[sortby])-(+b[sortby]))
  return sortArr
}