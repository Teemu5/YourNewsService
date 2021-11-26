import React, { useState, useEffect } from 'react'
import newsService from '../../services/news'
import {
    Box,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import Header from "../common/Header";
import Article from "./Article";
import {ArticleItem} from "../../models";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {updateSelectedCategories} from "../../state/app-slice";
import { chooseCategory, getCategoriesForCurrentUser } from '../../helpers'
// Categories have name, userCount and index
const categories: string[] = [
    'Business',
    'Entertainment',
    'Health',
    'Politics',
    'Products',
    'ScienceAndTechnology',
    'Sports',
    'US',
    'World'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Dashboard = () => {
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const dispatch = useAppDispatch();
    const {selected} = useAppSelector((state: { app: { categories: any; }; }) => state.app.categories);

    useEffect(() => {
        const getArticlesBing = async () => {
            const articles = await newsService.getAllBingNewsArticles(selected);
            articles.sort((a: ArticleItem, b: ArticleItem) =>
                b.datePublished.localeCompare(a.datePublished));
            setArticles(articles);
        }
        getArticlesBing()
    }, [selected]);
    
    useEffect(() => {const getCategories = async () => {
        dispatch(updateSelectedCategories(await getCategoriesForCurrentUser()))
        // If user is logged in, Get selected categories from backend
        
    }
    getCategories()
    }, [])
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {target}: any = event;
        const {value}: { value: string[] } = target;
        dispatch(updateSelectedCategories(value));
        const targetnames: string[] = target.value
        chooseCategory(targetnames)
    };

    const renderCategorySelector = () => {
        return (
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="categories-select-label">Categories</InputLabel>
                <Select
                    labelId="categories-select-label"
                    id="categories-select-checkbox"
                    multiple
                    value={selected}
                    onChange={handleChange}
                    input={<OutlinedInput label="Category"/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {categories.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selected.includes(name)}/>
                            <ListItemText primary={name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }

    const renderArticles = () =>
        <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap",}}>
            {articles.map((article: ArticleItem) =>
                <div key={article.title} style={{maxWidth: "33%",}}>
                    <Article item={article}/>
                </div>
            )}
        </Box>

    return (
        <>
            <Header/>
            {renderCategorySelector()}
            {renderArticles()}
        </>
    )
}

export default Dashboard;
