import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const url = searchParams.get('url');

	if (!url) {
		return Response.json({ error: 'Missing url parameter' }, { status: 400 });
	}

	let targetUrl: string = '';
	try {
		targetUrl = decodeURIComponent(url as string);
	} catch {
		return Response.json({ error: 'Invalid url encoding' }, { status: 400 });
	}

	// Only allow MLB API URLs for security
	if (!/^https:\/\/(statsapi|fastball-gateway)\.mlb\.com\//.test(targetUrl)) {
		return Response.json({ error: 'Forbidden target URL' }, { status: 403 });
	}

	try {
		const fetchOptions: RequestInit = {
			method: 'POST',
			headers: {},
		};

		fetchOptions.headers = { ...req.headers };
		// Remove host header to avoid issues
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete (fetchOptions.headers as any)['host'];
		fetchOptions.body = await req.text();

		console.log('fetchOptions', fetchOptions);
		const response = await fetch(targetUrl, fetchOptions);
		console.log('response', response);
		const data = await response.json();
		console.log('data', data);

		return Response.json(data, { status: response.status });
	} catch (error) {
		return Response.json(
			{ error: 'Proxy error', details: String(error) },
			{ status: 500 }
		);
	}
}
