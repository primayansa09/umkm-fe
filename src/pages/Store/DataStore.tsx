import Container from "@mui/material/Container";
import {DefaultDataStore} from "./DefaultStore";

export function DataStore (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultDataStore/>            
        </Container>
    )
}