import Container from "@mui/material/Container";
import {DefaultDataUser} from "./DefaultUser";

export function DataUsers (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultDataUser/>            
        </Container>
    )
}