// 미니멀 루틴 앱 (달력 선택 기반 체크 추가)
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {
  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem("routines");
    return saved ? JSON.parse(saved) : [];
  });

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", goal: "", startDate: dayjs().format("YYYY-MM-DD") });
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem("routines", JSON.stringify(routines));
  }, [routines]);

  const toggleLog = (id, date) => {
    const formatted = dayjs(date).format("YYYY-MM-DD");
    setRoutines((prev) =>
      prev.map((r) =>
        r.id === id
          ? r.logs.includes(formatted)
            ? { ...r, logs: r.logs.filter((d) => d !== formatted) }
            : { ...r, logs: [...r.logs, formatted] }
          : r
      )
    );
  };

  const startEdit = (routine) => {
    setEditing(routine.id);
    setForm({
      name: routine.name,
      goal: routine.goal,
      startDate: routine.startDate,
    });
  };

  const handleUpdate = () => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id === editing ? { ...r, ...form } : r
      )
    );
    setEditing(null);
  };

  const handleDelete = (id) => {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
    setEditing(null);
  };  
  

  return (
    <main className="max-w-md mx-auto p-4 text-lg">
      <img src="/minimal-routine/logo.png" alt="미니멀루틴 로고" className="w-40 mx-auto mb-4" />
    
      {editing === null ? (
        <div className="space-y-3">
          {routines.map((r) => {
            const count = r.logs.length;
            return (
              <div
                key={r.id}
                className="w-full border rounded-lg p-3 hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div onClick={() => startEdit(r)} className="cursor-pointer w-full">
                    <div className="font-normal">{r.name} {r.goal}</div>
                    <div className="text-sm text-gray-500">총 {count}일 완료</div>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEdit(r);
                      }}
                      className="text-sm text-blue-500 underline min-w-fit whitespace-nowrap"
                    >
                      수정
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(r.id);
                      }}
                      className="text-sm text-red-500 underline min-w-fit whitespace-nowrap"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>

            );
          })}
          <button
            onClick={() => {
              const newRoutine = {
                id: Date.now(),
                name: "새 루틴",
                goal: "",
                startDate: dayjs().format("YYYY-MM-DD"),
                logs: [],
              };
              setRoutines([...routines, newRoutine]);
            }}
            className="w-full border rounded-lg py-2 text-center text-lg text-gray-500 hover:bg-gray-100"
          >
            +
          </button>
          </div>
      ) : (
        <div className="space-y-4">
          <div className="text-lg font-semibold mb-2">{form.name} 루틴 달력</div>
          <Calendar
            value={calendarDate}
            onClickDay={(date) => toggleLog(editing, date)}
            tileClassName={({ date }) => {
              const formatted = dayjs(date).format("YYYY-MM-DD");
              const routine = routines.find((r) => r.id === editing);
              if (!routine) return null;
            
              const isStartDate = formatted === routine.startDate;
              const isChecked = routine.logs.includes(formatted);
            
              let className = "";
              if (isChecked) className += " selected-date";
              else className += " inactive-date";
            
              if (isStartDate) className += " start-date";
            
              return className.trim();
            }}
          />


          <button
            onClick={() => setEditing(null)}
            className="w-full bg-gray-700 text-white py-2 rounded mt-4"
          >
            ← 돌아가기
          </button>

          <div className="border p-3 rounded mt-4">
            <div className="text-sm text-gray-400">루틴 이름:</div>
            <input
              className="w-full font-normal text-lg outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              
            />
          </div>

          <div className="border p-3 rounded">
            <div className="text-sm text-gray-400">루틴 목표:</div>
            <input
              className="w-full font-normal text-lg outline-none"
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
            />
          </div>

          <div className="border p-3 rounded">
            <div className="text-sm text-gray-400">시작 일자:</div>
            <input
              type="date"
              className="w-full font-normal text-lg outline-none"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full bg-black text-white py-2 rounded"
          >
            수정 완료
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
