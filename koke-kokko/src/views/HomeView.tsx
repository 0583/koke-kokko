import {
    alpha, Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    InputAdornment,
    List,
    ListItem, ListItemIcon,
    Menu,
    MenuItem,
    MenuProps,
    Skeleton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { Photo, PinDrop, Search, Tag, } from "@mui/icons-material";
import React, { useEffect } from "react";
import KokkoMessageCard from "../widgets/KokkoMessageCard";
import { styled } from "@mui/material/styles";
import { ArticleTransferProps, SnackBarSenderProps } from "../App";
import { Config, Service } from "../services/service";
import { parseHashTag } from "../utils/hashTagParser";
import { LocalStoreConfig } from "../widgets/ConifgLocalstorageUtil";
import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";
import { Box } from "@mui/system";
import ClearIcon from '@mui/icons-material/Clear';
import { Schema } from "../services/schema/schema";
import { Request, YuanZhuoUtil } from "../services/request";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

function HomeView(props: SnackBarSenderProps & ArticleTransferProps) {
    const [kokkoText, setKokkoText] = React.useState<string>('');
    const [visibility, setVisibility] = React.useState<string>('Public');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [images, setImages] = React.useState<ImageType[]>([]);
    const [imageUuids, setImageUuids] = React.useState<string[]>([]);
    const [tagsList, setTagsList] = React.useState<string[]>()
    const [time, settime] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    //设置图片最大上传数量

    const [news, setNews] = React.useState<YuanZhuoUtil.NewsDTO[]>([])
    const [newsKeyword, setNewsKeyword] = React.useState<string>('')
    const [filteredNews, setFilteredNews] = React.useState<YuanZhuoUtil.NewsDTO[]>([])

    useEffect(() => {
        const realKeyword = newsKeyword.trim()
        console.log(realKeyword)
        if (!realKeyword) {
            setFilteredNews([...news])
        } else {
            setFilteredNews(news.filter((neww) => {
                return neww.category.includes(realKeyword) || neww.title.includes(realKeyword)
            }))
        }
    }, [news, newsKeyword])

    const maxNumber = 7;

    useEffect( () => {
        Request.get_news().then((news) => {
            console.log('news:', news)
            setNews(news)
        })
    }, [])

    //上传图片变动处理
    const piconChange = async (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        if (imageList.length > 0) {
            settime(true);
            const imageUuids = await Promise.all(imageList.map(async (imageObject) => {
                return await Request.upload_image(imageObject.file!)
            }));

            console.log(imageList, imageUuids, addUpdateIndex);
            setImages(imageList);
            setImageUuids(imageUuids);
        } else {
            setImages([]);
            setImageUuids([]);
            settime(false);
        }
    };

    function sendKokko() {
        const tags = parseHashTag(kokkoText)

        props.sender(`Send tags: ${JSON.stringify(tags)}`)

        Service.publish_article(LocalStoreConfig.get_config() ?? new Config(), kokkoText, "", imageUuids, tags)
            .then(() => {
                props.sender("Done!");
                refreshKokko()
                refreshTags()
                setKokkoText("")
                setImages([])
                setImageUuids([])
                props.sender("Kokko sent!")
            }
            ).catch((err) => {
                props.sender(`Failed to Kokko: ${err.toString()}`);
            })
    }


    function refreshKokko() {
        Service.list_article(LocalStoreConfig.get_config() ?? new Config())
            .then((articles) => {
                props.setArticles(articles)
                articles.forEach((article) => {
                    console.log(article.article_id, article.author)
                })
            }).catch((err) => {
                props.sender(`Failed to list kokkos: ${err.toString()}`);
            })
    }

    function closeEvent(visibility: string) {
        return () => {
            setVisibility(visibility);
            handleClose();
        }
    }

    function refreshTags() {
        Service.list_tag(LocalStoreConfig.get_config() ?? new Config()).then(
            (tags) => {
                setTagsList(tags.map((e) => { return e.tagname }))
            }
        ).catch(() => {
            setTagsList([])
        })
    }

    useEffect(() => {
        refreshKokko()
        refreshTags()
    }, [])

    const visibilityMenuOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));


    return (
        <ImageUploading
            multiple
            value={images}
            onChange={piconChange}
            maxNumber={maxNumber}
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
            }) => (
                <Grid container justifyContent={"center"}>
                    <Grid item xs={7}>
                        <List sx={{ height: '100%' }}>
                            <ListItem key="send_kokko">
                                <Stack spacing={2} sx={{ width: '100%' }}>
                                    <Box sx={{ borderRadius: ".75rem", padding: "1.25rem", borderStyle: "solid", borderWidth: "1px", borderColor: "#221a1a0d" }}>
                                        <TextField
                                            inputProps={{ maxLength: 140 }}
                                            id="outlined-textarea"
                                            label="What's happening?"
                                            placeholder="Input here"
                                            value={kokkoText}
                                            onChange={(e) => { setKokkoText(e.target.value) }}
                                            multiline
                                            fullWidth
                                            sx={{ mb: "16px" }}
                                            minRows={3}
                                        />
                                        <Stack direction="row" spacing={2}>
                                            {(loading ? Array.from(new Array(1)) : imageList).map((image, index) => (
                                                // { (
                                                <Box key={index} className="image-item">
                                                    {image && time ? (
                                                        <Box className="image-item__btn-wrapper" sx={{
                                                            width: "96px", height: "96px", borderRadius: "4px", backgroundImage: "url(" + image.dataURL + ")", backgroundSize: "cover",
                                                            backgroundPosition: "center", backgroundRepeat: "no-repeat"
                                                        }} >
                                                            <Box sx={{ background: "rgb(255, 255, 255, 0.7)", display: "flex", width: "24px", height: "24px", borderRadius: "12px", alignItems: "center", justifyContent: "center" }}>
                                                                <a onClick={() => { onImageRemove(index) }}>
                                                                    <ClearIcon sx={{ color: "#737373", width: "12px", height: "12px" }} />
                                                                </a>
                                                            </Box>
                                                        </Box>

                                                    ) : (
                                                        <Skeleton variant="rectangular" width={96} height={96} />
                                                    )}
                                                </Box>
                                            ))}
                                        </Stack>

                                    </Box>

                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                                            <Chip
                                                icon={<Photo />}
                                                size="small"
                                                label="Image"
                                                variant="outlined"
                                                onClick={() => {
                                                    onImageUpload();

                                                }}
                                            />
                                            <PopupState variant="popover" popupId="topics-popup-menu">
                                                {(popupState: any) => (
                                                    <React.Fragment>
                                                        <Chip
                                                            disabled={(tagsList?.length === 0) ?? false}
                                                            icon={<Tag />}
                                                            size="small"
                                                            label="Topic"
                                                            variant="outlined"
                                                            {...bindTrigger(popupState)}
                                                        />
                                                        <Menu {...bindMenu(popupState)}
                                                            elevation={1}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'left',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            }}>
                                                            {
                                                                tagsList?.map((tag) => {
                                                                    return (
                                                                        <MenuItem onClick={
                                                                            () => {
                                                                                setKokkoText(kokkoText + ` #${tag}`)
                                                                                popupState.close();
                                                                            }
                                                                        }>
                                                                            #{tag}
                                                                        </MenuItem>)
                                                                })
                                                            }
                                                        </Menu>
                                                    </React.Fragment>
                                                )}
                                            </PopupState>
                                            <Chip
                                                icon={<PinDrop />}
                                                size="small"
                                                label="Location"
                                                variant="outlined"
                                            />
                                            <Button
                                                size="small"
                                                id="basic-button"
                                                aria-controls={visibilityMenuOpen ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={visibilityMenuOpen ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                Visibility: {visibility}
                                            </Button>
                                            <StyledMenu
                                                id="demo-customized-menu"
                                                anchorEl={anchorEl}
                                                MenuListProps={{
                                                    'aria-labelledby': 'demo-customized-button',
                                                }}
                                                open={visibilityMenuOpen}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={closeEvent("Public")} selected={visibility === "Public"}>
                                                    <Stack>
                                                        <Typography fontWeight={visibility === "Public" ? "bold" : "normal"}>Public</Typography>
                                                        <Typography variant="body2" color="gray">Every Koke-kokko user could see this post.</Typography>
                                                    </Stack>
                                                </MenuItem>
                                                <MenuItem onClick={closeEvent("Followers")} selected={visibility === "Followers"}>
                                                    <Stack>
                                                        <Typography fontWeight={visibility === "Followers" ? "bold" : "normal"}>Followers</Typography>
                                                        <Typography variant="body2" color="gray">People you're following could see this post.</Typography>
                                                    </Stack>
                                                </MenuItem>
                                                <MenuItem onClick={closeEvent("Private")} selected={visibility === "Private"}>
                                                    <Stack>
                                                        <Typography fontWeight={visibility === "Private" ? "bold" : "normal"}>Private</Typography>
                                                        <Typography variant="body2" color="gray">Only yourself can see this post.</Typography>
                                                    </Stack>
                                                </MenuItem>
                                            </StyledMenu>
                                        </Stack>
                                        <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="center">
                                            <Typography fontSize={12} color="text.secondary">
                                                {kokkoText ? kokkoText.length.toString() + " / 140" : undefined}
                                            </Typography>
                                            <Button disabled={!(kokkoText.trim())} onClick={sendKokko} size="small" variant="outlined">Post</Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </ListItem>

                            {/*<ListItem key="preview_kokko">*/}
                            {/*    <KokkoMessageCard*/}
                            {/*        key={"template"}*/}
                            {/*        username="<Preview>"*/}
                            {/*        avatar="avatars/74477599.png"*/}
                            {/*        date="Jun 3, 2022"*/}
                            {/*        image={imageUuids}*/}
                            {/*        content={kokkoText}*/}
                            {/*        showActions={true}*/}
                            {/*    />*/}
                            {/*</ListItem>*/}
                            {
                                props.articles.map((article: Schema.Article) => {
                                    return (<ListItem key={article.article_id}>
                                        <KokkoMessageCard
                                            articleId={article.article_id}
                                            key={article.article_id}
                                            username={article.author}
                                            avatar={article.user_photo}
                                            image={article.article_photo}
                                            date={article.post_time}
                                            content={article.content}
                                            showActions={true} />
                                    </ListItem>)
                                })
                            }
                        </List>
                    </Grid>
                    <Grid item xs={5}>
                        <List>
                            <ListItem key="search">
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="input-with-icon-textfield"
                                    label="Search News"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={newsKeyword}
                                    onChange={(e) => { setNewsKeyword(e.target.value) }}
                                    variant="standard"
                                />
                            </ListItem>
                            {
                                filteredNews.map((neww, index) => {
                                    return (
                                        <ListItem key={index.toString()}>
                                            <Card sx={{ width: '100%' }} variant="outlined" elevation={0}>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {neww.category}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {neww.title}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button sx={{ marginLeft: 1, marginBottom: 1, marginTop: -1 }} size="small" href={neww.url}>Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </ListItem>
                                    )
                            })
                            }
                        </List>
                    </Grid>
                </Grid>
            )}
        </ImageUploading>
    )
}

export default HomeView;