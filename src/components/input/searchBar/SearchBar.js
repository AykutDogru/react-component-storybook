import React,
{
    forwardRef,
    useRef,
    useState,
    useEffect,
    useCallback,
    useImperativeHandle,
    cloneElement
} from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from './Style'
import classNames from "classnames";

export const SearchBar = forwardRef(
    (
        {
            cancelOnEscape,
            className,
            closeIcon,
            disabled,
            onCancelSearch,
            onRequestSearch,
            searchIcon,
            style,
            fullWidth,
            ...inputProps
        },
        ref
    ) => {
        const inputRef = useRef();
        const [value, setValue] = useState(inputProps.value);
        const classes = useStyles();
        useEffect(() => {
            setValue(inputProps.value);
        }, [inputProps.value]);

        const handleFocus = useCallback(
            (e) => {
                if (inputProps.onFocus) {
                    inputProps.onFocus(e);
                }
            },
            [inputProps.onFocus]
        );

        const handleBlur = useCallback(
            (e) => {
                setValue((v) => v.trim());
                if (inputProps.onBlur) {
                    inputProps.onBlur(e);
                }
            },
            [inputProps.onBlur]
        );

        const handleInput = useCallback(
            (e) => {
                setValue(e.target.value);
                if (inputProps.onChange) {
                    inputProps.onChange(e.target.value);
                }
            },
            [inputProps.onChange]
        );

        const handleCancel = useCallback(() => {
            setValue("");
            if (onCancelSearch) {
                onCancelSearch();
            }
        }, [onCancelSearch]);

        const handleRequestSearch = useCallback(() => {
            if (onRequestSearch) {
                onRequestSearch(value);
            }
        }, [onRequestSearch, value]);

        const handleKeyUp = useCallback(
            (e) => {
                if (e.charCode === 13 || e.key === "Enter") {
                    handleRequestSearch();
                } else if (
                    cancelOnEscape &&
                    (e.charCode === 27 || e.key === "Escape")
                ) {
                    handleCancel();
                }
                if (inputProps.onKeyUp) {
                    inputProps.onKeyUp(e);
                }
            },
            [handleRequestSearch, cancelOnEscape, handleCancel, inputProps.onKeyUp]
        );

        useImperativeHandle(ref, () => ({
            focus: () => {
                inputRef.current.focus();
            },
            blur: () => {
                inputRef.current.blur();
            },
        }));

        return (
            <Paper className={classNames(classes.root, className)} style={style}>
                <div className={classes.searchContainer}>
                    <Input
                        {...inputProps}
                        inputRef={inputRef}
                        onBlur={handleBlur}
                        value={value}
                        onChange={handleInput}
                        onKeyUp={handleKeyUp}
                        onFocus={handleFocus}
                        fullWidth={fullWidth}
                        className={classes.input}
                        disableUnderline
                        disabled={disabled}
                    />
                </div>
                <IconButton
                    onClick={handleRequestSearch}
                    className={classNames(classes.iconButton, classes.searchIconButton, {
                        [classes.iconButtonHidden]: value !== "",
                    })}
                    disabled={disabled}
                >
                    {cloneElement(searchIcon, {
                        classes: { root: classes.icon },
                    })}
                </IconButton>
                <IconButton
                    onClick={handleCancel}
                    className={classNames(classes.iconButton, {
                        [classes.iconButtonHidden]: value === "",
                    })}
                    disabled={disabled}
                >
                    {cloneElement(closeIcon, {
                        classes: { root: classes.icon },
                    })}
                </IconButton>
            </Paper>
        );
    }
);

SearchBar.propTypes = {
    /** 
     * Whether to clear search on escape 
   */
    cancelOnEscape: PropTypes.bool,
    /** 
     * Override or extend the styles applied to the component. 
    */
    classes: PropTypes.object.isRequired,
    /**
     *  Custom top-level class
    */
    className: PropTypes.string,
    /** 
     * Override the close icon. 
     */
    closeIcon: PropTypes.node,
    /**
     * Disables text field.
     */
    disabled: PropTypes.bool,
    /** 
     * Fired when the search is cancelled. 
     */
    onCancelSearch: PropTypes.func,
    /** 
     * Fired when the text value changes.
     */
    onChange: PropTypes.func,
    /** 
     * Fired when the search icon is clicked. 
     */
    onRequestSearch: PropTypes.func,
    /** 
     * Sets placeholder text for the embedded text field.
     */
    placeholder: PropTypes.string,
    /**
     * Override the search icon. 
     */
    searchIcon: PropTypes.node,
    /** 
     * Override the inline-styles of the root element. 
     */
    style: PropTypes.object,
    /**
     *  The value of the text field.
     */
    value: PropTypes.string,
    /**
     *  Whether to show fullWitdh or not
    */
    fullWidth: PropTypes.bool,

};

SearchBar.defaultProps = {
    className: "",
    closeIcon: <ClearIcon />,
    disabled: false,
    placeholder: "Search",
    searchIcon: <SearchIcon />,
    style: null,
    value: "",
    fullWidth: false
};
