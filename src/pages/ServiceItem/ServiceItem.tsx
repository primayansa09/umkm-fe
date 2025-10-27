import Container from "@mui/material/Container";
import {DefaultServiceItem} from "./DefaultServiceItem";

export function DataServiceItem (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultServiceItem/>            
        </Container>
    )
}