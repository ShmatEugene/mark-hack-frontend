import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import customTheme from '../../theme';
import { useStores } from '../../hooks/useStores';
import { useAuth } from '../../hooks/auth.hook';
import { Navigate, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <IconButton size='sm' variant='plain' color='neutral' disabled />;
    }
    return (
        <IconButton
            id='toggle-mode'
            size='sm'
            variant='plain'
            color='neutral'
            {...props}
            onClick={(event) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                onClick?.(event);
            }}
        >
            {mode === 'light' ? 'change mode' : 'change mode'}
        </IconButton>
    );
}

/**
 * This template uses [`Inter`](https://fonts.google.com/specimen/Inter?query=inter) font.
 */
const Login = observer(() => {
    const { operatorStore } = useStores();
    const { login } = useAuth();
    const navigate = useNavigate();

    console.log(operatorStore.authInfo);

    return (
        <CssVarsProvider defaultMode='dark' disableTransitionOnChange theme={customTheme}>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
                        '--Cover-width': '40vw', // must be `vw` only
                        '--Form-maxWidth': '700px',
                        '--Transition-duration': '0.4s', // set to `none` to disable transition
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width: 'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(4px)',
                    backgroundColor: 'rgba(255 255 255 / 0.6)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'rgba(19 19 24 / 0.4)',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width: 'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                        maxWidth: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component='header'
                        sx={{
                            py: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <ColorSchemeToggle />
                    </Box>
                    <Box
                        component='main'
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .${formLabelClasses.asterisk}`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <div>
                            <Typography component='h2' fontSize='xl2' fontWeight='lg'>
                                Добро пожаловать!
                            </Typography>
                            <Typography level='body2' sx={{ my: 1, mb: 3 }}>
                                Вебсервис для эффективного управления товарными запасами,
                                дистрибуцией и продажами бизнеса.
                            </Typography>
                        </div>
                        <form
                            onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                                event.preventDefault();
                                const formElements = event.currentTarget.elements;
                                const data = {
                                    email: formElements.email.value,
                                    password: formElements.password.value,
                                };
                                let test = operatorStore.login(data.email, data.password);

                                test.then((token_info) => {
                                    login(
                                        token_info.access_token,
                                        Math.round(Math.random()),
                                        data.email
                                    );
                                }).then(() => {
                                    navigate('/home');
                                });
                            }}
                        >
                            <FormControl required>
                                <FormLabel>ИНН</FormLabel>
                                <Input placeholder='Введите логин' type='number' name='inn' />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Логин</FormLabel>
                                <Input placeholder='Введите логин' type='text' name='email' />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Пароль</FormLabel>
                                <Input placeholder='•••••••' type='password' name='password' />
                            </FormControl>
                            <Button type='submit' fullWidth>
                                Войти
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8)',
                    // [theme.getColorSchemeSelector('dark')]: {
                    //     backgroundImage:
                    //         'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831)',
                    // },
                })}
            />
        </CssVarsProvider>
    );
});

export default Login;
