import {useField} from "./Hooks";
import React, {useEffect} from "react";
import {FieldProps} from "./FieldProps";
import {FieldState} from "../Data/Types/FieldState";
import {useServiceFactory} from "../Services/ServiceFactory/Hooks";
import {SetupActions} from "../Data/Actions/Setup/SetupActions";
import {defaultInitializeFunc, FieldInitializeFunc} from "./Helpers";
import {useDefaults} from "../Defaults/Hooks";
import {useDispatch} from "../Form/Hooks";

export interface WithFieldProps {
    handleChange: (e: any) => void;
    field: FieldState;
    dispatch: any;
}


export function withField<Props extends FieldProps = FieldProps>(Component: React.ComponentType<Props & WithFieldProps>, initializeFieldFunc: FieldInitializeFunc = defaultInitializeFunc, defaultProps: Partial<FieldProps> = {}) {
    return function Wrapper(props: Omit<Props, keyof WithFieldProps>) {
        props = {...props, ...defaultProps};
        const name = props.name;
        const field = useField(name);
        const dispatch = useDispatch();
        const serviceFactory = useServiceFactory();
        const defaults = useDefaults();
        const changeHandler = serviceFactory.createChangeHandler(name);
        let isNotInitializedYet = field === undefined;

        useEffect(() => {
            if (isNotInitializedYet) {
                dispatch(SetupActions.initializeField(props.name, initializeFieldFunc(props as Props, defaults)));
            }
        }, [dispatch, defaults, isNotInitializedYet, props]);

        useEffect(() => {
            if (!isNotInitializedYet) {
                const updater = serviceFactory.createStateUpdater();
                updater.update(field, props as Props);
            }
        }, [props, serviceFactory, field, isNotInitializedYet])

        if (isNotInitializedYet) {
            return null;
        }

        if (field.hidden) {
            return <React.Fragment/>
        }

        let onChange: any = (e: any) => changeHandler.handle(e, props.onValueChange);

        const toInjectProps: WithFieldProps = {
            handleChange: onChange,
            dispatch: dispatch,
            field: field
        };

        return <Component {...(props as Props)} {...toInjectProps}/>
    }
}
