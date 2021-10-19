import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

interface ArticleProps {
    text: string;
    title: string;
    source: string;
    sourceLink: string;
}

const Article = (props: ArticleProps) => {
    const {source, sourceLink, text, title} = props;

    const openSource = (link: string) => {
        const newWindow = window.open(link, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }

    return (
        <Card sx={{margin: ".66rem",}}>
            <CardContent>
                <Typography gutterBottom variant="h5">{title}</Typography>
                <Typography variant="body2" color="text.secondary">{text}</Typography>
                <span>source: {source}</span>
            </CardContent>
            <CardActions>
                <Button size="small" disabled>Share</Button>
                <Button size="small" onClick={() => openSource(sourceLink)}>Read more</Button>
            </CardActions>
        </Card>
    )
}

export default Article;
