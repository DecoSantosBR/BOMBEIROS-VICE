import { trpc } from "../lib/trpc";

export default function Home() {
  const { data: courses, isLoading } = trpc.courses.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Carregando cursos...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          1º CBM Lotus - Cursos Disponíveis
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt={course.nome}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {course.nome}
                </h2>
                {course.descricao && (
                  <p className="text-gray-600 mb-4">{course.descricao}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-red-600">
                    {course.valor === "0" || course.valor === "Gratuito"
                      ? "Gratuito"
                      : `R$ ${Number(course.valor).toLocaleString("pt-BR")}`}
                  </span>
                </div>
                {course.requisitos && course.requisitos !== "Nenhum" && (
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Requisitos:</strong> {course.requisitos}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
