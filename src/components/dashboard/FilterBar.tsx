import { useEffect } from "react";

interface FilterBarProps {
  activeDropdown: string;
  setActiveDropdown: (key: string) => void;
  setStatusFilter: (value: string) => void;
  setPriorityFilter: (value: string) => void;
  setDueDateSort: (value: string) => void;
  clearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  activeDropdown,
  setActiveDropdown,
  setStatusFilter,
  setPriorityFilter,
  setDueDateSort,
  clearFilters,
}) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickedInside = target.closest(".filter-dropdown");
      if (!clickedInside) setActiveDropdown("");
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setActiveDropdown]);

  return (
    <section className="filter-bar">
      <button onClick={clearFilters}>All Tasks</button>

      <div className="filter-dropdown">
        <button
          onClick={() =>
            setActiveDropdown(activeDropdown === "status" ? "" : "status")
          }
        >
          Filter by Status ▾
        </button>
        {activeDropdown === "status" && (
          <div className="dropdown-menu">
            {["To Do", "In Progress", "In Review", "Completed"].map(
              (status) => (
                <div
                  key={status}
                  className="dropdown-item"
                  onClick={() => {
                    setStatusFilter(status);
                    setActiveDropdown("");
                  }}
                >
                  {status}
                </div>
              )
            )}
          </div>
        )}
      </div>

      <div className="filter-dropdown">
        <button
          onClick={() =>
            setActiveDropdown(activeDropdown === "priority" ? "" : "priority")
          }
        >
          Filter by Priority ▾
        </button>
        {activeDropdown === "priority" && (
          <div className="dropdown-menu">
            {["Low", "Medium", "High"].map((priority) => (
              <div
                key={priority}
                className="dropdown-item"
                onClick={() => {
                  setPriorityFilter(priority);
                  setActiveDropdown("");
                }}
              >
                {priority}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="filter-dropdown">
        <button
          onClick={() =>
            setActiveDropdown(activeDropdown === "due-date" ? "" : "due-date")
          }
        >
          Sort by Due Date ▾
        </button>
        {activeDropdown === "due-date" && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => {
                setDueDateSort("asc");
                setActiveDropdown("");
              }}
            >
              Soonest First
            </div>
            <div
              className="dropdown-item"
              onClick={() => {
                setDueDateSort("desc");
                setActiveDropdown("");
              }}
            >
              Latest First
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterBar;
