import React from 'react';
const Kurssi = (props)=>{
  return(
  <div>
    <Otsikko nimi={props.kurssi.nimi}/>
    <Sisalto osat={props.kurssi.osat}/>
    <Yhteensa osat={props.kurssi.osat}/>
  </div>
  )
}


const Otsikko = (props)=> <h1>{props.nimi}</h1>
const Sisalto = (props)=>{
                          let osat = props.osat.map((osa)=><Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia}/>)
                          return(
                            <div>
                              {osat}
                            </div>)
                          }
const Osa = (props)=>{
  return(
  <div>
    <p>{props.nimi} {props.tehtavia}</p>
  </div>
  )
}
const Yhteensa = (props)=>{
  const summa = (yhteensa,osa)=>osa.tehtavia+yhteensa;
  let yhteensa = props.osat.reduce(summa,0);
  return(<div><p>Tehtäviä yhteensä {yhteensa}</p></div>)
}

export default Kurssi