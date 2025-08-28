import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "../ui/skeleton"
function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl bg-amber-200" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]  bg-amber-200" />
        <Skeleton className="h-4 w-[200px]  bg-amber-200" />
      </div>
    </div>
  )
}
const Todos = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [newTitle, setNewTitle] = useState("")

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=6")
        const data = await res.json()
        setTodos(data)
      } catch (error) {
        console.error("Error fetching todos:", error)
      } finally {
        setLoading(false)
      }
    }
    setTimeout(()=>{
        fetchTodos()
    },3000)
  }, [])

  // Handle open edit modal
  const handleEdit = (todo) => {
    setSelectedTodo(todo)
    setNewTitle(todo.title)
  }

  // Handle save changes
  const handleSave = () => {
    setTodos((prev) =>
      prev.map((t) => (t.id === selectedTodo.id ? { ...t, title: newTitle } : t))
    )
    setSelectedTodo(null) // close modal
  }

  if (loading) {
    // return <p className="text-center mt-10">Loading todos...</p>
    // return <Skeleton className="h-[20px] w-[100px] rounded-full" />
    return <SkeletonCard />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
      {todos.map((todo) => (
        <Card key={todo.id} className="shadow-md">
          <CardHeader>
            <CardTitle className="truncate">{todo.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Status: {todo.completed ? "✅ Completed" : "❌ Not Completed"}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => handleEdit(todo)}>
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Edit Dialog */}
      <Dialog open={!!selectedTodo} onOpenChange={() => setSelectedTodo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTodo(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Todos