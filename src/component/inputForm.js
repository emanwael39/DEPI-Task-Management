import { Trash2, PlusCircle, Edit } from "lucide-react";
import { useState } from "react";

export default function InputForm() {
    const [Title, setTitle] = useState(""); 
    const [desc, setDesc] = useState("");
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);

    function handleChangeInput1(e) {
        setTitle(e.target.value);
    }

    function handleChangeInput2(e) {
        setDesc(e.target.value);
    }

    function handleAddOrUpdate() {
        if (Title.trim() === "" || desc.trim() === "") {
            alert("Please enter both Title and Description!");
            return;
        }

        if (editId !== null) {
            const updatedData=data.map((item)=>item.id === editId ? { ...item, Title, desc } : item)
            setData( updatedData);
            setEditId(null);
        } else {
            const newData=[
                ...data,
                { id: data.length, Title, desc }
            ]
            setData(newData)
        }

        setTitle("");
        setDesc("");
    }

    function handleDelete(id) {
        const delData=data.filter((item)=> item.id !== id)
        setData(delData);
    }

    function handleEdit(id) {
        const itemToEdit = data.find(item => item.id === id);
        setTitle(itemToEdit.Title);
        setDesc(itemToEdit.desc);
        setEditId(id); 
    }

    return (
        <>
            <div className="input-form">
                <h2>{editId !== null ? "Edit Task" : "Add New Task"}</h2>
                <h4>Title</h4>
                <input type="text" value={Title} onChange={handleChangeInput1} />
                <h4>Description</h4>
                <input type="text" value={desc} onChange={handleChangeInput2} />
                <button onClick={handleAddOrUpdate} style={{display:"flex", alignItems:"center", gap:"5px"}}>
                    <PlusCircle size={20} /> {editId !== null ? "Update Task" : "Add Task"}
                </button>
            </div>

            <div className="List">
                <h3 style={{marginBottom:"30px"}}>Task List</h3>
                {data.map((item) => (
                    <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" ,justifyContent:"space-between"}}>
                        <div style={{display:"flex"}}>
                            <input type="checkbox" style={{ marginRight:"20px" }} />
                            <div>
                                <h4>{item.Title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(item.id)} style={{ background: "transparent", border: "none", cursor: "pointer" ,marginRight:"10px" }}>
                                <Trash2 size={20} color="red" />
                            </button>
                            <button onClick={() => handleEdit(item.id)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                                <Edit size={20} color="blue" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
 
