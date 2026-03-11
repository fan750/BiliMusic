const STORAGE_KEY = 'my_playlist'
const tools={
    getAll(){
        const list=localStorage.getItem(STORAGE_KEY)
        if (!list) return [] // 如果没有数据，返回空数组
        try {
            const parsed = JSON.parse(list)
            return Array.isArray(parsed) ? parsed : []
        } catch (e) {
            console.error('JSON parse error', e)
            return []
        }
    },
    saveList(playlist){
        try{
            localStorage.setItem(STORAGE_KEY, JSON.stringify(playlist))
        } catch (error) {
            console.error('Error saving list to localStorage:', error)
        }
    },
    addList(newlist,song=[], description=''){
        const currentList=this.getAll()
        // 检查是否已经存在同名歌单，避免覆盖
        if (currentList.some(l => l.name === newlist)) {
            console.warn(`Playlist "${newlist}" already exists.`)
            return
        }
        currentList.push({name:newlist,songs:song, description: description})
        this.saveList(currentList)
    },
    addSong(ListName,SongName,Bv){
        const currentList=this.getAll()
        const listIndex=currentList.findIndex(list=>list.name===ListName)
        if(listIndex!==-1){
            // 简单的排重检查（可选）
             if(currentList[listIndex].songs.some(s => s.bv === Bv)) {
                console.warn(`Song with BV ${Bv} already exists in list ${ListName}.`);
                // 能够选择是否允许重复添加，这里暂且允许继续添加或做个提示，目前逻辑保持原样只是稍微优化结构
             }
            currentList[listIndex].songs.push({name:SongName,bv:Bv})
            this.saveList(currentList)
        }
    },
    removeList(ListName){
        const currentList=this.getAll()
        const updatedList=currentList.filter(list=>list.name!==ListName)
        this.saveList(updatedList)
    },
    removeSong(ListName,SongName){
        const currentList=this.getAll()
        const listIndex=currentList.findIndex(list=>list.name===ListName)
        if(listIndex!==-1){
            const updatedSongs=currentList[listIndex].songs.filter(song=>song.name!==SongName)
            currentList[listIndex].songs=updatedSongs
            this.saveList(currentList)
        }
    },
     async getSongTime(Bv){
        // 使用代理路径 /api 绕过CORS限制
        const res=await fetch(`/api/x/web-interface/view?bvid=${Bv}`)
        const data=await res.json()
        return data.data.duration
    }
}
export default tools