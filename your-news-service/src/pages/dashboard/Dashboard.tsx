import {useState} from "react";
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

const categories = [
    "Finance",
    "Cooking",
    "Baseball",
    "Football",
    "Cycling",
    "Programming",
    "Entertainment",
];

const articles: ArticleItem[] = [
    {
        title: "Stock market on comeback trail heads into what's supposed to be another stellar earnings season",
        text: 'Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.',
        source: 'cnbc',
        sourceLink: "https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html",
    },
    {
        title: "Stock market on comeback trail heads into what's supposed to be another stellar earnings season",
        text: 'Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.',
        source: 'cnbc',
        sourceLink: "https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html",
    },
    {
        title: "Stock market on comeback trail heads into what's supposed to be another stellar earnings season",
        text: 'Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.',
        source: 'cnbc',
        sourceLink: "https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html",
    },
    {
        title: "Stock market on comeback trail heads into what's supposed to be another stellar earnings season",
        text: 'Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.',
        source: 'cnbc',
        sourceLink: "https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html",
    },
    {
        title: "Stock market on comeback trail heads into what's supposed to be another stellar earnings season",
        text: 'Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.',
        source: 'cnbc',
        sourceLink: "https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html",
    },
    {
        title: "Stock market on comeback trail heads into what's supposed to be another stellar earnings season",
        text: 'Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.',
        source: 'cnbc',
        sourceLink: "https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html",
    },
    {
        title: "Stock market on comeback trail heads into what's supposed to be another stellar earnings season",
        text: 'Stock proved hard to keep down this week, and the start of the earnings season could further bolster the comeback if profits roll in as expected or better.',
        source: 'cnbc',
        sourceLink: "https://www.cnbc.com/2021/10/08/stock-market-on-comeback-trail-heads-into-whats-supposed-to-be-another-stellar-earnings-season-.html",
    },
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
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {target}: any = event;
        const {value}: { value: string[] } = target;
        setSelectedCategories(value);
    };

    const renderCategorySelector = () => {
        return (
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="categories-select-label">Categories</InputLabel>
                <Select
                    labelId="categories-select-label"
                    id="categories-select-checkbox"
                    multiple
                    value={selectedCategories}
                    onChange={handleChange}
                    input={<OutlinedInput label="Category"/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {categories.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedCategories.includes(name)}/>
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
                <div style={{maxWidth: "33%",}}>
                    <Article text={article.text} title={article.title}
                             source={article.source} sourceLink={article.sourceLink}/>
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
