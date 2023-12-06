import { Box, FilledInput, FormHelperText, IconButton, Input, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface InputsProps {
    texto: string
    tipo?: 'texto'|'number'|'password'
    valor?: any
    showPassword?: boolean
    disabled?: boolean

}

export default function Inputs(props: InputsProps) {
    const shows = props.showPassword ? props.showPassword : false
    const disabled = props.disabled ?  true: false
    return (


        <FormControl fullWidth sx={{ m: 1, w: 100 }}>
            <InputLabel htmlFor="standard-adornment-password">{props.texto}</InputLabel>
            <Input
               disabled={disabled}
                value={props.valor}
                id="standard-adornment-password"
                type={props.tipo}

                endAdornment={
                    shows ? <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => { }}
                            onMouseDown={() => { }}
                        >
                            {shows ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                        : null
                }
            />

        </FormControl>



    )



}