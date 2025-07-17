using ExamenParcial6_StevenFonseca.Data;
using ExamenParcial6_StevenFonseca.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamenParcial6_StevenFonseca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly ToDoContext _context;
        public TareaController(ToDoContext context)
        {
            _context = context;
        }
        // GET: api/tareas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetTareas()
        {
            return await _context.Tareas.ToListAsync();
        }

        // GET: api/tareas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTarea(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);

            if (tarea == null)
            {
                return NotFound();
            }

            return tarea;
        }

        // PUT: api/tareas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarea(int id, Tarea tarea)
        {
            if (id != tarea.Id)
                return BadRequest() //falta ;

            _context.Entry(tarea).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tareas.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/tareas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarea(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);

            if (tarea == null)
                return NotFound();

            _context.Tareas.Remove(tarea);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/tareas
        [HttpPost]
        public async Task<ActionResult<Tarea>> PostTarea(Tarea tarea)
        {
            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTarea), new { id = tarea.Id }, tarea);
        }

        // GET: api/tareas/estado/completadas
        [HttpGet("estado/{completadas}")]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetPorEstado(bool completadas)
        {
            return await _context.Tareas
                .Where(t => t.Completada == completadas)
                .ToListAsync();
        }

        // GET: api/tareas/ordenar/fecha
        [HttpGet("ordenar/{tipo}")]
        public async Task<ActionResult<IEnumerable<Tarea>>> OrdenarTareas(string tipo)
        {
            return tipo switch
            {
                "fecha" => await _context.Tareas.OrderBy(t => t.FechaLimite).ToListAsync(),
                "prioridad" => await _context.Tareas.OrderBy(t => t.Prioridad).ToListAsync(),
                _ => await _context.Tareas.ToListAsync()
            };
        }

        //GET: api/tareas/buscar/{texto}
        [HttpGet("buscar/{texto}")]
        public async Task<ActionResult<IEnumerable<Tarea>>> Buscar(string texto)
        {
            return await _context.Tareas
                .Where(t => t.Titulo.Contains(texto) || t.Descripcion.Contains(texto))
                .ToListAsync();
        }
    }
}
