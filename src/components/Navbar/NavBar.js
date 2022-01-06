import React from "react";

const NavBar=()=>{
    let nombre = 'gonza'
    let parrafo = <p>Hola <strong>capos</strong>desde jsx</p>
    const paises =  [{id:1, nombre:'nigeria'}, {id:2, nombre: 'argentina'}, {id:3, nombre:'japon'}
    ]


return(
    <div>
        <ul>
            {paises.map(pais=>{
                return<li key={pais.id}>{pais.nombre}</li>
            })}
        </ul>
    </div>
)
}
export default NavBar;

