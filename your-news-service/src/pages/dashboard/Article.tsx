import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {ArticleItem} from "../../models";

interface ArticleProps {
    item: ArticleItem;
}

const Article = (props: ArticleProps) => {
    const {item} = props;
    const {title, description, source, category, imageUrl, sourceLink} = item;

    const openSource = (link: string) => {
        const newWindow = window.open(link, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }

    return (
        <Card sx={{margin: ".66rem",}}>
            <CardContent>
                <Typography gutterBottom variant="h5">{title}</Typography>
                <img alt="News article image" src={imageUrl}/>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
                <div>Category: {category}</div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>Source: {source.name} <img alt="Source provider logo" width={60} src={source.imageUrl}/></div>
            </CardContent>
            <CardActions>
                <Button size="small" disabled>Share</Button>
                <Button size="small" onClick={() => openSource(sourceLink)}>Read more</Button>
            </CardActions>
        </Card>
    )
}

export default Article;
